import { View, Text, Image } from "react-native";
import colors from "../colors";

import { LinearGradient } from "expo-linear-gradient";

import procractorImg from "../assets/appimages/procractor.png";

export default () => {
  return (
    <View
      style={{
        width: "100%",
        height: 110,
        backgroundColor: "#fff",
        flexDirection: "row",
        borderRadius: 20,
        padding: 8,
        marginBottom: 10,
      }}
    >
      <LinearGradient
        colors={["rgba(69, 45, 80, 0.74)", "rgba(145, 192, 201, 0.7)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: "100%",
          aspectRatio: 1,
          borderRadius: 20,
          backgroundColor: "#452D50",
        }}
      >
        <Image
          source={procractorImg}
          style={{
            position: "relative",
            left: 10,
            top: -15,
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </LinearGradient>
      <View style={{ paddingLeft: 10, flex: 1 }}>
        <Text
          style={{
            fontFamily: "VisbyRoundDemiBold",
            fontSize: 20,
            color: colors.blackForText,
          }}
        >
          Angles
        </Text>
        <Text
          style={{
            fontFamily: "VisbyRoundDemiBold",
            fontSize: 15,
            color: "rgba(69, 45, 80, 0.7)",
            marginTop: -2,
          }}
        >
          Geometry
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
            274/460 solved
          </Text>
          <Text
            style={{
              fontFamily: "VisbyRoundDemiBold",
              fontSize: 13,
              color: "#ccc",
            }}
          >
            50%
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
              width: "50%",
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
    </View>
  );
};
