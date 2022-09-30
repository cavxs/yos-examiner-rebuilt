import { View, Text, TouchableOpacity, Dimensions } from "react-native";

import colors from "../colors";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Alert = ({ setAlerting, goHome }) => {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        top: -100,
        width: windowWidth,
        height: windowHeight + 50,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "#FFF3E0",
          width: 320,
          height: 200,
          borderRadius: 20,
          marginTop: -100,
        }}
      >
        <Text
          style={{
            fontFamily: "VisbyRoundDemiBold",
            fontSize: 27,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Options
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setAlerting(false)}
          style={{
            width: "80%",
            alignSelf: "center",
            backgroundColor: colors.purple,
            borderRadius: 50,
            height: 50,
            justifyContent: "center",
            elevation: 10,
            marginTop: 30,
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
            Go back
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
            marginTop: 0,
          }}
        >
          <Text
            style={{
              fontFamily: "VisbyRoundBold",
              alignSelf: "center",
              textAlign: "center",
              color: colors.red,
              fontSize: 21,
            }}
          >
            Quit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Alert;
