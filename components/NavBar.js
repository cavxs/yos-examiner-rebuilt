import { View, Image, Pressable, Animated, Dimensions } from "react-native";

import { useRef, useState, useEffect } from "react";

import colors from "../colors";

import navstylerImg from "../assets/appimages/navstyler.png";
import navBarImg from "../assets/appimages/Navbar.png";

import HomeSvg from "./Svgs/HomeSvg";
import SettingsSvg from "./Svgs/SettingsSvg";
import PencilSvg from "./Svgs/PencilSvg";

import NavBarOutlet from "./pages/NavBarOutlet";

import { NavBarScreens } from "../constants";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const NavBar = () => {
  const navBarHeight = useRef(new Animated.Value(0)).current;
  const navBarTranslateY = useRef(new Animated.Value(0)).current;

  const [selectedScreen, setSelectedScreen] = useState(
    NavBarScreens.HomeScreen
  );
  const [examMode, setExamMode] = useState(false);
  const [navUpMisin, setNavUpMisin] = useState(false);

  useEffect(() => {
    if (examMode) {
      // Move the nav up and show the ---
      Animated.timing(navBarTranslateY, {
        toValue: -200,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [examMode]);

  useEffect(() => {
    navBarHeight.setValue(50);
  }, []);

  const navUp = () => {
    Animated.spring(navBarHeight, {
      toValue: WINDOW_HEIGHT - 40,
      duration: 400,
      bounciness: 4,
      useNativeDriver: false,
    }).start();
    setNavUpMisin(true);
  };

  const navDown = () => {
    Animated.timing(navBarHeight, {
      toValue: 50,
      duration: 350,
      useNativeDriver: false,
    }).start();
    setNavUpMisin(false);
  };

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: navBarHeight,
          backgroundColor: "#fff",

          // overflow: "hidden",

          paddingTop: navUpMisin == false ? 30 : 45,

          // shadowColor: "#000",
          // shadowOpacity: 1,
          // shadowRadius: 400,
          // elevation: 10,
        }}
      >
        <Image
          source={navBarImg}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 100,
            marginTop: -80,
            resizeMode: "stretch",
          }}
        />
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-around",
            zIndex: 2,

            transform: [{ translateY: navBarTranslateY }],
          }}
        >
          <Pressable
            style={{ marginTop: -40 }}
            onPress={() => {
              setSelectedScreen(NavBarScreens.PencilScreen);
              navUp();
            }}
          >
            <PencilSvg
              color={
                selectedScreen == NavBarScreens.PencilScreen
                  ? colors.deepOrange
                  : "#ccc"
              }
              thickness={selectedScreen == NavBarScreens.PencilScreen ? 5 : 2.5}
            />
          </Pressable>
          <Pressable
            style={{ marginTop: -40 }}
            onPress={() => {
              setSelectedScreen(NavBarScreens.HomeScreen);
              navDown();
            }}
          >
            <HomeSvg
              color={
                selectedScreen == NavBarScreens.HomeScreen
                  ? colors.deepOrange
                  : "#ccc"
              }
              thickness={selectedScreen == NavBarScreens.HomeScreen ? 5 : 2.5}
            />
          </Pressable>
          <SettingsSvg color={"#ccc"} />
        </Animated.View>

        {selectedScreen == NavBarScreens.PencilScreen ||
        selectedScreen == NavBarScreens.OptionsScreen ? (
          <NavBarOutlet setExamMode={setExamMode} />
        ) : null}
      </Animated.View>
    </View>
  );
};

export default NavBar;
