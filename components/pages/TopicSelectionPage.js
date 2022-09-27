import { useRef, useEffect, useState } from "react";
import { View, Text, Animated, FlatList } from "react-native";

import { SubjectSelection } from "../../constants";

import AvailableTopics from "../../available_topics.json";

import TopicButton from "../TopicButton";

import s3 from "../../api/AWSclient";

const TopicSelectionPage = ({ selectedSubject, selectTopic1, setExamData }) => {
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const flatListTranslateY = useRef(new Animated.Value(0)).current;

  const [flatListScroll, setFlatListScroll] = useState(0);
  const [availableTopics, setAVTL] = useState([]);

  useEffect(() => {
    s3.getAvailableTopics("Puza", selectedSubject, (data) => {
      console.log(data);
      setAVTL(data);
    });
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
    s3.getQuestionsFromTopic(selectedSubject, topic, 5, [1, 1], (data) => {
      setExamData(data);
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
    <View style={{ flex: 1 }}>
      <Animated.Text
        style={{
          fontFamily: "VisbyRoundMedium",
          marginTop: 20,
          fontSize: 36,
          alignSelf: "center",
          zIndex: 3,
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
            />
          )}
        />
      ) : null}
    </View>
  );
};

export default TopicSelectionPage;
