import { View, Text, Animated, Pressable, Dimensions } from "react-native";
import { useRef, useEffect, useState } from "react";

import { LinearGradient } from "expo-linear-gradient";
import colors from "../colors";

import { SubjectGradientValues } from "../constants";

const TOPIC_NAME_MAX_LENGTH = 12;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TopicButton = ({
  scroll,
  subject,
  topic: { index, item },
  selectTopic1,
  progress,
}) => {
  const [animating, setAnimating] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;

  let startNotice = false;

  console.log("progress", progress);

  useEffect(() => {
    startNotice = true;
    translateX.setValue(-500);
    setAnimating(false);
    if (scroll + windowHeight - 320 >= index * 110 && !animating) {
      setAnimating(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        delay: index * 20,
      }).start();
    }
  }, []);

  useEffect(() => {
    if (
      scroll + windowHeight - 200 >= index * 110 &&
      !animating &&
      !startNotice
    ) {
      setAnimating(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [scroll]);

  const subjectColorGradient = SubjectGradientValues[subject];
  return (
    <Pressable onPress={() => selectTopic1(item)}>
      <Animated.View
        style={{
          width: windowWidth - 20,
          height: 120,
          backgroundColor: "#fff",
          flexDirection: "row",
          borderRadius: 20,
          elevation: 8,
          marginLeft: 10,
          padding: 8,
          marginTop: !index ? 20 : 0,
          marginBottom: 20,
          transform: [{ translateX: translateX }],
        }}
      >
        <LinearGradient
          colors={subjectColorGradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: "100%",
            aspectRatio: 1,
            borderRadius: 20,
            backgroundColor: "#452D50",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "VisbyRoundDemiBold",
              fontSize: 70,
              alignSelf: "center",
              color: "#fff",
            }}
          >
            {index + 1}
          </Text>
        </LinearGradient>
        <View style={{ paddingLeft: 10, flex: 1 }}>
          <Text
            style={{
              fontFamily: "VisbyRoundDemiBold",
              fontSize: 27,
              color: colors.blackForText,
            }}
          >
            {item.length > TOPIC_NAME_MAX_LENGTH
              ? item.slice(0, TOPIC_NAME_MAX_LENGTH - 1) + "..."
              : item}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 18,
              marginBottom: 2,
            }}
          >
            <Text
              style={{
                fontFamily: "VisbyRoundDemiBold",
                fontSize: 14,
                color: "#ccc",
              }}
            >
              {progress ? progress[0] : "??"}/{progress ? progress[1] : "??"}{" "}
              solved
            </Text>
            <Text
              style={{
                fontFamily: "VisbyRoundDemiBold",
                fontSize: 13,
                color: "#ccc",
              }}
            >
              {progress ? Math.round((progress[0] / progress[1]) * 100) : "??"}%
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 9,
              backgroundColor: "#ccc",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                width: progress
                  ? Math.round((progress[0] / progress[1]) * 100)
                  : "0" + "%",
                height: "100%",
                position: "absolute",
                top: -10,
                left: 0,

                backgroundColor: "#7FD6AB",
                marginTop: 10,
                borderRadius: 20,
              }}
            ></View>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default TopicButton;
