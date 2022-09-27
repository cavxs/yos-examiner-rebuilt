import { View, Text, Animated, TouchableOpacity } from "react-native";

import CircularProgress from "react-native-circular-progress-indicator";
import colors from "../../colors";

const ExamResultsPage = ({ examResults, goHome }) => {
  const progressBarValue = Math.round(
    (examResults["plrAnswerData"]["right"] / examResults["totalQuestions"]) *
      100
  );

  return (
    <View>
      <Animated.Text
        style={{
          fontFamily: "VisbyRoundMedium",
          marginTop: 30,
          fontSize: 36,
          alignSelf: "center",
          zIndex: 3,
        }}
      >
        Results
      </Animated.Text>
      <View
        style={{
          marginTop: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          value={progressBarValue}
          radius={100}
          activeStrokeColor={colors.green}
          inActiveStrokeColor={"#efefef"}
          activeStrokeWidth={20}
          inActiveStrokeWidth={20}
          valueSuffix={"%"}
          progressValueFontSize={40}
        />
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
        {examResults["plrAnswerData"]["right"]}/{examResults["totalQuestions"]}{" "}
        questions answered
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
    </View>
  );
};

export default ExamResultsPage;
