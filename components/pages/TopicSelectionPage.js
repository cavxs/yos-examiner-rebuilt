import { useRef, useEffect, useState } from "react";
import { View, Text, Animated, FlatList } from "react-native";

import { SubjectSelection } from "../../constants";

import TopicButton from "../TopicButton";

import colors from "../../colors";

import s3 from "../../api/AWSclient";
import {
  getLastQuestionAt,
  questionNameToArray,
  getSolvedQNo,
  getWrongQuestions,
} from "../../api/storage";

const TopicSelectionPage = ({ selectedSubject, selectTopic1, setExamData }) => {
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const flatListTranslateY = useRef(new Animated.Value(0)).current;

  const [flatListScroll, setFlatListScroll] = useState(0);
  const [availableTopics, setAVTL] = useState([]);
  const [progressInEachTopic, setPIET] = useState([]);

  useEffect(() => {
    setPIET([]);
    const done = async () => {
      s3.getAvailableTopics("Puza", selectedSubject, async (data) => {
        setAVTL(data);

        for (topic of data) {
          await new Promise((res) => {
            getWrongQuestions("Puza", selectedSubject, topic, (wrongQ) => {
              console.log("Wrong questions in", topic, "are", wrongQ);
            });
            s3.getNumberOfQuestionsInTopic(
              selectedSubject,
              topic,
              async (totalQ) => {
                getSolvedQNo("Puza", selectedSubject, topic, (progressDeno) => {
                  console.log("progress in TopicalSelectionPage", progressDeno);
                  if (progressDeno) {
                    setPIET((old) => [...old, [Number(progressDeno), totalQ]]);
                  } else {
                    setPIET((old) => [...old, [0, totalQ]]);
                  }
                  res();
                });
              }
            );
          });
        }
      });
    };

    done().catch(() => console.log("error"));
  }, []);

  const selectTopicF = (topic) => {
    Animated.timing(headerTranslateY, {
      toValue: -200,
      duration: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(flatListTranslateY, {
      toValue: 600,
      duration: 400,
      useNativeDriver: true,
    }).start();
    selectTopic1(topic);
    getLastQuestionAt("Puza", selectedSubject, topic, (lastQAt) => {
      let lastQArray = [1, 1];
      if (lastQAt) lastQArray = questionNameToArray(lastQAt);
      console.log("the last question solved here is " + lastQArray);
      s3.getQuestionsFromTopic(
        selectedSubject,
        topic,
        5,
        lastQArray,
        false,
        (data) => {
          console.log("the data: " + JSON.stringify(data));
          setExamData(data);
        }
      );
    });
  };

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 300,
      delay: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <>
      <Animated.Text
        style={{
          fontFamily: "VisbyRoundMedium",
          marginTop: 10,
          fontSize: 36,
          alignSelf: "center",
          zIndex: 13,
          opacity: headerOpacity,
          transform: [{ translateY: headerTranslateY }],
        }}
      >
        {selectedSubject == SubjectSelection.GeometryCard
          ? "GEOMETRY"
          : selectedSubject == SubjectSelection.Math1Card
          ? "MATHEMATICS I"
          : selectedSubject == SubjectSelection.Math2Card
          ? "MATHEMATICS II"
          : selectedSubject == SubjectSelection.IQCard
          ? "IQ"
          : null}
      </Animated.Text>
      <View style={{ flex: 1, backgroundColor: colors.lightOrange }}>
        {availableTopics.length ? (
          <Animated.FlatList
            data={availableTopics}
            style={{
              marginTop: 30,
              paddingBottom: 20,
              transform: [{ translateY: flatListTranslateY }],
            }}
            onScroll={(e) => setFlatListScroll(e.nativeEvent.contentOffset.y)}
            renderItem={(t) => (
              <TopicButton
                scroll={flatListScroll}
                subject={selectedSubject}
                selectTopic1={selectTopicF}
                topic={t}
                progress={progressInEachTopic[t.index]}
              />
            )}
          />
        ) : null}
      </View>
    </>
  );
};

export default TopicSelectionPage;
