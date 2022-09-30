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
  const [navUpMisin, setNavUpMisin] = useState(false); // for the padding up of the three buttons (to fix when they look like shit when the nav moves up)

  const navBarHidden = (val) => {
    // Navbar is the three buttons, it is hidden during the exam
    if (val) {
      Animated.timing(navBarTranslateY, {
        toValue: -200,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(navBarTranslateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    switch (selectedScreen) {
      case NavBarScreens.HomeScreen:
        navUp(false);
        break;
      case NavBarScreens.PencilScreen:
        navUp(true);
        break;
    }
  }, [selectedScreen]);

  useEffect(() => {
    navBarHeight.setValue(50);
  }, []);

  const navUp = (val) => {
    const to = val == true ? WINDOW_HEIGHT - 40 : 50;
    Animated.spring(navBarHeight, {
      toValue: to,
      duration: 400,
      bounciness: 4,
      useNativeDriver: false,
    }).start();
    setNavUpMisin(val);
  };

  const goToScreen = (navBarScreen) => {
    setSelectedScreen(navBarScreen);
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
        <Image // this is the nav bar from the top
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
          <NavBarOutlet goToScreen={goToScreen} navBarHidden={navBarHidden} />
        ) : null}
      </Animated.View>
    </View>
  );
};

export default NavBar;
