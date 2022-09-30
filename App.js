import { StyleSheet, View, Animated } from "react-native";
import { useFonts } from "expo-font";

import HomePage from "./components/pages/HomePage";
import NavBar from "./components/NavBar";
import { clearStorage } from "./api/storage";

import CircularProgress from "react-native-circular-progress-indicator";

export default function App() {
  const [loaded] = useFonts({
    VisbyRoundLight: require("./assets/fonts/VisbyRoundCF-Light.otf"),
    VisbyRoundRegular: require("./assets/fonts/VisbyRoundCF-Regular.otf"),
    VisbyRoundMedium: require("./assets/fonts/VisbyRoundCF-Medium.otf"),
    VisbyRoundDemiBold: require("./assets/fonts/VisbyRoundCF-DemiBold.otf"),
    VisbyRoundBold: require("./assets/fonts/VisbyRoundCF-Bold.otf"),
  });

  if (!loaded) return null;

  // clearStorage();

  return (
    <View style={styles.container}>
      <HomePage />
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    overflow: "visible",
  },
});
