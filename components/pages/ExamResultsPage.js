import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import ReviseAnswersPage from "./ReviseAnswersPage";

import CircularProgress from "react-native-circular-progress-indicator";
import colors from "../../colors";
import { useEffect, useRef, useState } from "react";

const ExamResultsPage = ({ examResults, goHome, examData, moveShadowDown }) => {
  const examRpageOpacity = useRef(new Animated.Value(0)).current;
  const revisePageOpacity = useRef(new Animated.Value(0)).current;

  const [loadRevisePage, setLRP] = useState(false);
  const [progressBarValue, setProgressBarValue] = useState(null);

  useEffect(() => {
    setProgressBarValue(
      Math.round(
        (examResults["plrAnswerData"]["right"] /
          examResults["totalQuestions"]) *
          100
      )
    );
  }, [examData]);

  useEffect(() => {
    examRpageOpacity.setValue(1);
    moveShadowDown(0);
    setLRP(false);
  }, []);
  const reviseAnswersClicked = () => {
    Animated.timing(examRpageOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(revisePageOpacity, {
      toValue: 1,
      duration: 200,
      delay: 200,
      useNativeDriver: true,
    }).start();
    moveShadowDown(50);
    setLRP(true);
  };

  return (
    <>
      <Animated.Text
        style={{
          fontFamily: "VisbyRoundMedium",
          marginTop: 15,
          fontSize: 36,
          alignSelf: "center",
          opacity: examRpageOpacity,
          zIndex: 3,
        }}
      >
        Results
      </Animated.Text>
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            position: "absolute",
            opacity: examRpageOpacity,
            width: "100%",
            top: 0,
            left: 0,
          }}
        >
          <View
            style={{
              marginTop: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!(progressBarValue === null) ? (
              <CircularProgress
                value={40}
                radius={100}
                activeStrokeColor={colors.green}
                inActiveStrokeColor={"#efefef"}
                activeStrokeWidth={20}
                inActiveStrokeWidth={20}
                valueSuffix={"%"}
                progressValueFontSize={40}
              />
            ) : null}
          </View>
          <Text
            style={{
              fontFamily: "VisbyRoundDemiBold",
              width: "100%",
              textAlign: "center",
              color: "#888",
              marginTop: 30,
              fontSize: 18,
            }}
          >
            {examResults["plrAnswerData"]["right"]}/
            {examResults["totalQuestions"]} questions answered
          </Text>
          <Text
            style={{
              fontFamily: "VisbyRoundBold",
              width: "80%",
              alignSelf: "center",
              textAlign: "center",
              color: colors.blackForText,
              marginTop: 15,
              fontSize: 21,
            }}
          >
            You completed 20% of Angles
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={reviseAnswersClicked}
            style={{
              width: "80%",
              alignSelf: "center",
              backgroundColor: colors.green,
              borderRadius: 50,
              height: 50,
              justifyContent: "center",
              marginTop: 60,
            }}
          >
            <Text
              style={{
                fontFamily: "VisbyRoundBold",
                alignSelf: "center",
                textAlign: "center",
                color: "#fff",
                fontSize: 21,
              }}
            >
              Revise wrong answers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goHome}
            activeOpacity={0.7}
            style={{
              width: "80%",
              alignSelf: "center",
              backgroundColor: "transparent",
              borderRadius: 50,
              height: 50,
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "VisbyRoundBold",
                alignSelf: "center",
                textAlign: "center",
                color: colors.green,
                fontSize: 21,
              }}
            >
              Go home
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            height: "100%",
            top: 0,
            opacity: revisePageOpacity,
            left: 0,
            zIndex: loadRevisePage ? 12 : 0,
          }}
        >
          {loadRevisePage ? (
            <>
              <ReviseAnswersPage
                examResults={examResults}
                examData={examData}
                goHome={goHome}
              />
            </>
          ) : null}
        </Animated.View>
      </View>
    </>
  );
};

export default ExamResultsPage;
