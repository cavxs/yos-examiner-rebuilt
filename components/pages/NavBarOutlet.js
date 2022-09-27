import { useState, useRef, useEffect } from "react";
import { View, Image, Text, Animated } from "react-native";

import { SubjectSelection } from "../../constants";
import NavBarImg from "../../assets/appimages/Navbar.png";

import SubjectSelectionPage from "./SubjectSelectionPage";
import TopicSelectionPage from "./TopicSelectionPage";
import ExamPage from "./ExamPage";
import ExamResultsPage from "./ExamResultsPage";

import { NavBarScreens } from "../../constants";

const NavBarOutlet = ({ setExamMode, goToScreen }) => {
  const shadowHeight = useRef(new Animated.Value(0)).current;
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [examResults, setExamResults] = useState(null);
  const [examData, setExamData] = useState({});

  useEffect(() => {
    shadowHeight.setValue(55);
  }, []);
  useEffect(() => {
    if (selectedSubject.length) moveShadowDown();
    if (selectedTopic.length && !examResults) {
      moveShadowUpExamMode();
      setExamMode(true);
    }
  }, [selectedSubject, selectedTopic]);

  useEffect(() => {
    if (examResults) {
      moveShadowDown();
      setExamMode(false);
    }
  }, [examResults]);

  const goHome = () => {
    setSelectedSubject("");
    setSelectedTopic("");
    setExamResults(null);
    setExamMode(false);
    goToScreen(NavBarScreens.HomeScreen);
  };

  const moveShadowDown = () => {
    Animated.spring(shadowHeight, {
      toValue: -15,
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

  const moveShadowDownExamMode = () => {
    Animated.timing(shadowHeight, {
      toValue: 55,
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
          setExamData={setExamData}
        />
      ) : examResults == null ? (
        <ExamPage
          examData={examData}
          goHome={goHome}
          setExamResults={setExamResults}
        />
      ) : (
        <ExamResultsPage goHome={goHome} examResults={examResults} />
      )}
    </View>
  );
};

export default NavBarOutlet;
