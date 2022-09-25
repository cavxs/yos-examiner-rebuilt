import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";

import topLefterImg from "../../assets/appimages/TopLefter.png";
import pfpImg from "../../assets/appimages/pfp.png";
import searchImg from "../../assets/appimages/search.png";

import colors from "../../colors";

import { useRef } from "react";

import MainCards from "../MainCards";
import MainRecents from "../MainRecents";

const HomePage = () => {
  const sizeAnim = useRef(new Animated.Value(0)).current;
  const size2Anim = useRef(new Animated.Value(0)).current;

  const onPencilPressed = () => {
    sizeAnim.setValue(0);
    size2Anim.setValue(0);
    Animated.timing(sizeAnim, {
      toValue: 500,
      duration: 2000,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.timing(size2Anim, {
        toValue: 500,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    }, 200);
  };

  const opacityIntrp = sizeAnim.interpolate({
    inputRange: [0, 500],
    outputRange: [0.7, 0],
  });

  const opacity2Intrp = size2Anim.interpolate({
    inputRange: [0, 500],
    outputRange: [0.7, 0],
  });
  console.log(opacity2Intrp);

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: colors.lightOrange,
        }}
        contentContainerStyle={{
          paddingHorizontal: 35,
          paddingTop: 42,
          paddingBottom: 100,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 25, height: 25, resizeMode: "contain" }}
            source={topLefterImg}
          />
          <Pressable
            onPress={onPencilPressed}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Image
              style={{ width: 40, height: 40, resizeMode: "contain" }}
              source={pfpImg}
            />
            <Animated.View
              style={{
                position: "absolute",
                width: sizeAnim,
                height: sizeAnim,
                opacity: opacityIntrp,
                borderRadius: 500,
                borderWidth: 2,
                borderColor: colors.fadingCircles,
                zIndex: -1,
              }}
            />
            <Animated.View
              style={{
                position: "absolute",
                width: size2Anim,
                height: size2Anim,
                opacity: opacity2Intrp,
                borderRadius: 500,
                borderWidth: 2,
                borderColor: colors.fadingCircles,
                zIndex: -1,
              }}
            />
          </Pressable>
        </View>
        <Text
          style={{
            fontFamily: "VisbyRoundLight",
            fontSize: 35,
            color: colors.blackForText,
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          Hello,{" "}
          <Text style={{ fontFamily: "VisbyRoundDemiBold" }}>Ibrahim</Text>
        </Text>
        <View
          style={{
            height: 60,
            backgroundColor: "#fff",
            borderRadius: 100,
            alignItems: "center",
            paddingLeft: 22,
            flexDirection: "row",
            marginTop: 35,
            elevation: 5,
          }}
        >
          <Image source={searchImg} style={{ resizeMode: "contain" }} />
          <TextInput
            style={{
              fontFamily: "VisbyRoundBold",
              fontSize: 20,
              color: colors.blackForText,
              flex: 1,
              margin: 11,
            }}
            placeholder="Search topics"
          />
        </View>
        <MainCards />
        <MainRecents />
      </ScrollView>
    </>
  );
};

export default HomePage;
