import { useState, useRef, useEffect } from "react";
import { View, Image, Animated } from "react-native";

import { SubjectSelection } from "../../constants";
import NavBarImg from "../../assets/appimages/Navbar.png";

import SubjectSelectionPage from "./SubjectSelectionPage";
import TopicSelectionPage from "./TopicSelectionPage";
import ExamPage from "./ExamPage";

const NavBarOutlet = ({ setExamMode }) => {
  const shadowHeight = useRef(new Animated.Value(0)).current;
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    shadowHeight.setValue(55);
  }, []);
  useEffect(() => {
    if (selectedSubject.length) moveShadowDown();
    if (selectedTopic.length) {
      moveShadowUpExamMode();
      setExamMode(true);
    }
  }, [selectedSubject, selectedTopic]);

  const moveShadowDown = () => {
    Animated.spring(shadowHeight, {
      toValue: -30,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const moveShadowUpExamMode = () => {
    Animated.timing(shadowHeight, {
      toValue: 200,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.Image
        source={NavBarImg}
        style={{
          position: "absolute",
          zIndex: 1,
          transform: [{ rotate: "180deg" }, { translateY: shadowHeight }],
          width: "100%",
          height: 120,
          zIndex: 1,
          resizeMode: "stretch",
        }}
      />
      {selectedSubject == "" ? (
        <SubjectSelectionPage selectSubject1={setSelectedSubject} />
      ) : selectedTopic == "" ? (
        <TopicSelectionPage
          selectTopic1={setSelectedTopic}
          selectedSubject={selectedSubject}
        />
      ) : (
        <ExamPage />
      )}
    </View>
  );
};

export default NavBarOutlet;
