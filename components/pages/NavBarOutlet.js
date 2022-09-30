import { useState, useRef, useEffect } from "react";
import { View, Image, Text, Animated } from "react-native";

import { SubjectSelection } from "../../constants";
import NavBarImg from "../../assets/appimages/Navbar.png";

import SubjectSelectionPage from "./SubjectSelectionPage";
import TopicSelectionPage from "./TopicSelectionPage";
import ExamPage from "./ExamPage";
import ExamResultsPage from "./ExamResultsPage";

import { NavBarScreens, shadowValues } from "../../constants";

const NavBarOutlet = ({ navBarHidden, goToScreen }) => {
  const shadowHeight = useRef(new Animated.Value(0)).current;
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [examResults, setExamResults] = useState(null);
  const [examData, setExamData] = useState({});

  useEffect(() => {
    shadowHeight.setValue(55);
  }, []);
  useEffect(() => {
    if (selectedSubject.length) moveShadowTo(shadowValues.shadowDown); // on topic selection screen
    if (selectedTopic.length && !examResults) {
      // on exam screen
      moveShadowTo(shadowValues.shadowUpHidden); // hide the upside down nav bar to the top
      navBarHidden(true);
    }
  }, [selectedSubject, selectedTopic]);

  useEffect(() => {
    if (examResults) {
      moveShadowTo(shadowValues.shadowDown);
      navBarHidden(false);
    }
  }, [examResults]);

  const goHome = () => {
    setSelectedSubject("");
    setSelectedTopic("");
    setExamResults(null);
    navBarHidden(false);
    goToScreen(NavBarScreens.HomeScreen);
  };

  const moveShadowTo = (to) => {
    Animated.spring(shadowHeight, {
      toValue: to,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.Image
        source={NavBarImg}
        style={{
          position: "absolute",
          transform: [{ rotate: "180deg" }, { translateY: shadowHeight }],
          width: "100%",
          height: 120,
          resizeMode: "stretch",
          zIndex: 1,
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
        <ExamResultsPage
          goHome={goHome}
          examResults={examResults}
          examData={examData}
          moveShadowDown={moveShadowTo}
        />
      )}
    </View>
  );
};

export default NavBarOutlet;
