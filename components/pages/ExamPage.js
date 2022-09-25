import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
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

const windowWidth = Dimensions.get("window").width;

const answers = "ABCDBCDBCDAACDBB";

const ExamPage = () => {
  const progressWidth = useRef(new Animated.Value(0)).current;
  const bgColorChange = useRef(new Animated.Value(0)).current;

  const [quesAt, setQuesAt] = useState(1);
  const [wrong, setWrong] = useState(false);
  const totalQuestions = 16;

  useEffect(() => {
    Animated.timing(progressWidth, {
      toValue: (quesAt / totalQuestions) * (windowWidth * 0.93),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [quesAt]);

  const nextQuestion = (ans) => {
    if (quesAt < totalQuestions) {
      setQuesAt((old) => old + 1);
      bgColorChange.setValue(0);
      Animated.timing(bgColorChange, {
        toValue: 100,
        duration: 700,
        useNativeDriver: false,
      }).start();
      if (ans === answers[quesAt]) {
        setWrong(false);
      } else {
        setWrong(true);
      }
    }
  };
  const zeroQ = () => {
    setQuesAt(0);
  };

  const bgColorINT = !wrong
    ? bgColorChange.interpolate({
        inputRange: [0, 50, 100],
        outputRange: ["#fff", "#7FD6AB", "#fff"],
      })
    : bgColorChange.interpolate({
        inputRange: [0, 50, 100],
        outputRange: ["#fff", colors.red, "#fff"],
      });

  console.log(bgColorINT);

  return (
    <Animated.View
      style={{
        backgroundColor: bgColorINT,
        flex: 1,
        marginTop: -85,
        paddingTop: 35,
      }}
    >
      <NavLeftSvg style={{ position: "absolute", top: 42, left: 15 }} />
      <Text
        style={{
          fontFamily: "VisbyRoundMedium",
          fontSize: 24,
          color: "#8C8C8C",
          width: "100%",
          textAlign: "center",
        }}
      >
        Mathematics I
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
        Exponential
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
          {quesAt}/16 solved
        </Text>
        <Text
          style={{
            fontFamily: "VisbyRoundDemiBold",
            fontSize: 13,
            color: "#ccc",
          }}
        >
          {Math.round((quesAt / totalQuestions) * 100)}%
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
            width: progressWidth,
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
          source={icon}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "red",
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
            onPress={() => nextQuestion("A")}
          >
            <Image
              source={btnA}
              style={{ resizeMode: "contain", width: 187 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 0.5, alignItems: "center" }}
            activeOpacity={0.7}
            onPress={() => nextQuestion("B")}
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
            onPress={() => nextQuestion("C")}
          >
            <Image
              source={btnC}
              style={{ resizeMode: "contain", width: 187 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 0.5, alignItems: "center" }}
            activeOpacity={0.7}
            onPress={() => nextQuestion("D")}
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
          onPress={zeroQ}
        >
          <Image
            source={btnSkip}
            style={{ resizeMode: "contain", width: 360, marginTop: -40 }}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default ExamPage;
