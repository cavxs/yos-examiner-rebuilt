import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../colors";

import studyguy1 from "../assets/appimages/studyguy1.png";

import StartBtnInside from "./Svgs/StartBtnInside";
import { useRef, useState } from "react";

const elementWidth = Dimensions.get("window").width - 50;

const Circulars = ({ scrollX, index }) => {
  const outputRange = [0, 1, 0];
  const scale = [
    scrollX.interpolate({
      inputRange: [0 * elementWidth, 1 * elementWidth],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
    scrollX.interpolate({
      inputRange: [0 * elementWidth, 1 * elementWidth, 2 * elementWidth],
      outputRange: [0, 1, 0],
      extrapolate: "clamp",
    }),
    scrollX.interpolate({
      inputRange: [1 * elementWidth, 2 * elementWidth],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  ];

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          width: 29,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.circle}>
          <Animated.View
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              backgroundColor: colors.blackForText,
              transform: [{ scale: scale[0] }],
            }}
          ></Animated.View>
        </View>
        <View style={styles.circle}>
          <Animated.View
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              backgroundColor: colors.blackForText,
              transform: [{ scale: scale[1] }],
            }}
          ></Animated.View>
        </View>
        <View style={styles.circle}>
          <Animated.View
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              backgroundColor: colors.blackForText,
              transform: [{ scale: scale[2] }],
            }}
          ></Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 8,
    height: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.blackForText,
  },
  circle_selected: {
    backgroundColor: colors.blackForText,
  },
});

const MainCards = () => {
  const [scrollIndex, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const indexCalc = (e) => {
    scrollX.setValue(e.nativeEvent.contentOffset.x);
    setIndex(Math.round(e.nativeEvent.contentOffset.x / elementWidth));
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Circulars scrollX={scrollX} index={scrollIndex} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={Dimensions.get("window").width - 50}
        decelerationRate={"fast"}
        overScrollMode={"never"}
        onScroll={indexCalc}
        style={{
          width: useWindowDimensions().width,
          marginLeft: -35,
          paddingLeft: 35,
          overflow: "visible",
        }}
      >
        <View style={{ overflow: "visible", paddingBottom: 40 }}>
          <LinearGradient
            colors={["rgba(239, 139, 111, 1)", "rgba(239, 139, 111, 0.15)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={style.card}
          >
            <Text
              style={{
                fontFamily: "VisbyRoundBold",
                fontSize: 35,
                color: colors.blackForText,
              }}
            >
              Geometry
            </Text>
            <Text
              style={{
                fontFamily: "VisbyRoundBold",
                fontSize: 20,
                marginTop: 4,
                color: "#fff",
              }}
            >
              Continue Solving
            </Text>
            <TouchableOpacity
              style={{
                width: 110,
                height: 36,
                marginLeft: 20,
                marginTop: 10,
                backgroundColor: "#fff",
                borderRadius: 20,
                alignContent: "center",
                justifyContent: "center",
                zIndex: 4,
                elevation: 4,
                // shadowColor: "#0",
                // shadowOpacity: 1,
                // shadowRadius: 40,
                // shadowOffset: { width: 10, height: 10 },
                // elevation: 5,
              }}
            >
              <StartBtnInside style={{ width: "100%", alignSelf: "center" }} />
            </TouchableOpacity>
          </LinearGradient>
          <Image
            source={studyguy1}
            style={{
              position: "absolute",
              bottom: 0,
              left: 120,
              zIndex: 2,
              width: 250,
              resizeMode: "contain",
            }}
          />
        </View>

        <LinearGradient
          colors={["rgba(69, 45, 80, 1)", "rgba(69, 45, 80, 0.85)"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{
            ...style.card,
            ...{
              paddingLeft: 0,
              paddingTop: 0,
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <Text
            style={{
              fontFamily: "VisbyRoundLight",
              fontSize: 30,
              color: "#fff",
              textAlign: "center",
            }}
          >
            “Start working for your dreams.”
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={["rgba(239, 139, 111, 1)", "rgba(239, 139, 111, 0.15)"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={style.card}
        >
          <Text>Hello</Text>
        </LinearGradient>
        <View style={{ width: 50 }} />
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width - 70,
    height: 235,
    borderRadius: 20,
    marginRight: 15,
    paddingLeft: 30,
    paddingTop: 40,
  },
});

export default MainCards;
