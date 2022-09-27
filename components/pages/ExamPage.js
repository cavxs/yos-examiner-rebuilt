import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";

import colors from "../../colors";

import icon from "../../assets/icon.png";
import trashbtn from "../../assets/appimages/trashbtn.png";
import undobtn from "../../assets/appimages/undobtn.png";

import btnA from "../../assets/appimages/answerbtns/btna.png";
import btnB from "../../assets/appimages/answerbtns/btnb.png";
import btnC from "../../assets/appimages/answerbtns/btnc.png";
import btnD from "../../assets/appimages/answerbtns/btnd.png";
import btnSkip from "../../assets/appimages/answerbtns/btnskip.png";

import NavLeftSvg from "../Svgs/NavLeftSvg";
import { useEffect, useRef, useState } from "react";
import Alert from "../Alert";

const windowWidth = Dimensions.get("window").width;

const ExamPage = ({ setExamResults, goHome, examData }) => {
  const progressWidth = useRef(new Animated.Value(0)).current;
  const bgColorChange = useRef(new Animated.Value(0)).current;
  const examOpacity = useRef(new Animated.Value(0)).current;

  const [quesAt, setQuesAt] = useState(0);
  const [bgColorer, setBgColorer] = useState(false);
  const [alerting, setAlerting] = useState(false);
  const [plrAnswerData, setPlrAnswerData] = useState({
    right: 0,
    wrong: 0,
    skipped: 0,
    data: [],
  });
  const totalQuestions = examData.length;

  useEffect(() => {
    // progressWidth.setValue(Math.round((1 / totalQuestions) * 100));
    examOpacity.setValue(1);
  }, []);
  useEffect(() => {
    if (totalQuestions) {
      Animated.timing(progressWidth, {
        toValue: Math.round((quesAt / totalQuestions) * 100),
        duration: 300,
        useNativeDriver: false,
      }).start();

      console.log(quesAt);
      if (quesAt < totalQuestions) {
        bgColorChange.setValue(0);
        Animated.timing(bgColorChange, {
          toValue: 100,
          duration: 700,
          useNativeDriver: false,
        }).start();
      } else {
        // Exam finished
        Animated.timing(progressWidth, {
          toValue: 100,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(examOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }).start(() => {
          console.log("sending " + JSON.stringify(plrAnswerData));
          setExamResults({ totalQuestions, plrAnswerData }); // {totalQuestions, plrAnswerData: {right, wrong, skipped, data}}
        });
      }
    }
  }, [quesAt]);

  const answer = (ans) => {
    if (!(ans == "S")) {
      if (ans === examData[quesAt]["ans"]) {
        setBgColorer("R");
        setPlrAnswerData({
          ...plrAnswerData,
          right: plrAnswerData["right"] + 1,
          data: [...plrAnswerData["data"], "R"],
        });
      } else {
        setPlrAnswerData({
          ...plrAnswerData,
          wrong: plrAnswerData["wrong"] + 1,
          data: [...plrAnswerData["data"], "W"],
        });
        setBgColorer("W");
      }
    } else {
      setPlrAnswerData({
        ...plrAnswerData,
        skipped: plrAnswerData["skipped"] + 1,
        data: [...plrAnswerData["data"], "S"],
      });
      setBgColorer("");
    }
    setQuesAt((old) => old + 1);
  };

  const bgColorINT =
    bgColorer == "R"
      ? bgColorChange.interpolate({
          inputRange: [0, 50, 100],
          outputRange: ["#fff", "#7FD6AB", "#fff"],
        })
      : bgColorer == "W"
      ? bgColorChange.interpolate({
          inputRange: [0, 50, 100],
          outputRange: ["#fff", colors.red, "#fff"],
        })
      : null;

  const progressWidthINT = progressWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  if (!examData.length) return null;
  return (
    <>
      {alerting ? <Alert goHome={goHome} setAlerting={setAlerting} /> : null}
      <Animated.View
        style={{
          backgroundColor: bgColorINT,
          flex: 1,
          marginTop: -85,
          paddingTop: 35,
          opacity: examOpacity,
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            top: 42,
            left: 15,
            zIndex: 3,
          }}
          onPress={() => setAlerting(true)}
        >
          <NavLeftSvg style={{ marginRight: 20 }} />
        </Pressable>

        <Text
          style={{
            fontFamily: "VisbyRoundMedium",
            fontSize: 24,
            color: "#8C8C8C",
            width: "100%",
            textAlign: "center",
          }}
        >
          {examData[quesAt]?.subject}
        </Text>
        <Text
          style={{
            fontFamily: "VisbyRoundMedium",
            fontSize: 35,
            color: colors.blackForText,
            marginTop: -11,
            width: "100%",
            textAlign: "center",
          }}
        >
          {examData[quesAt]?.topic}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 18,
            marginBottom: 2,
            width: "93%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "VisbyRoundDemiBold",
              fontSize: 14,
              color: "#ccc",
            }}
          >
            Question {quesAt + 1}/{totalQuestions}
          </Text>
          <Text
            style={{
              fontFamily: "VisbyRoundDemiBold",
              fontSize: 13,
              color: "#ccc",
            }}
          >
            {Math.round((quesAt / (totalQuestions + 1)) * 100)}%
          </Text>
        </View>
        <View
          style={{
            width: "93%",
            alignSelf: "center",
            height: 9,
            backgroundColor: "#ccc",
            borderRadius: 20,
          }}
        >
          <Animated.View
            style={{
              width: progressWidthINT,
              height: "100%",
              position: "absolute",
              top: -10,
              left: 0,

              backgroundColor: colors.green,
              marginTop: 10,
              borderRadius: 20,
            }}
          />
        </View>
        <View style={{ width: "100%", height: "45%", marginTop: 10 }}>
          <Image
            source={{ uri: examData[quesAt]?.ques }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={{ marginTop: -45 }}>
          <TouchableOpacity style={{ alignSelf: "flex-start" }}>
            <Image source={undobtn} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: -15, alignSelf: "flex-start" }}>
            <Image source={trashbtn} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: -15 }}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <TouchableOpacity
              style={{ flex: 0.5, alignItems: "center", marginRight: -20 }}
              activeOpacity={0.7}
              onPress={() => answer("A")}
            >
              <Image
                source={btnA}
                style={{ resizeMode: "contain", width: 187 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 0.5, alignItems: "center" }}
              activeOpacity={0.7}
              onPress={() => answer("B")}
            >
              <Image
                source={btnB}
                style={{ resizeMode: "contain", width: 187 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", width: "100%", marginTop: -40 }}>
            <TouchableOpacity
              style={{ flex: 0.5, alignItems: "center", marginRight: -20 }}
              activeOpacity={0.7}
              onPress={() => answer("C")}
            >
              <Image
                source={btnC}
                style={{ resizeMode: "contain", width: 187 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 0.5, alignItems: "center" }}
              activeOpacity={0.7}
              onPress={() => answer("D")}
            >
              <Image
                source={btnD}
                style={{ resizeMode: "contain", width: 187 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            activeOpacity={0.7}
            onPress={() => answer("E")}
          >
            <Image
              source={btnSkip}
              style={{ resizeMode: "contain", width: 360, marginTop: -40 }}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

export default ExamPage;
