import { useRef, useEffect, useState } from "react";
import { View, Text, Animated, FlatList } from "react-native";

import { SubjectSelection } from "../../constants";

import AvailableTopics from "../../available_topics.json";

import TopicButton from "../TopicButton";

const TopicSelectionPage = ({ selectedSubject, selectTopic1 }) => {
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const flatListTranslateY = useRef(new Animated.Value(0)).current;

  const [flatListScroll, setFlatListScroll] = useState(0);

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

      <Animated.FlatList
        data={AvailableTopics[selectedSubject]}
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
    </View>
  );
};

export default TopicSelectionPage;
