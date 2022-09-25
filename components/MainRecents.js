import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import RecentCard from "./RecentCard";

import colors from "../colors";

const MainRecents = () => {
  return (
    <View>
      <Text
        style={{
          fontFamily: "VisbyRoundMedium",
          fontSize: 35,
          marginLeft: 25,
          marginBottom: 10,
          color: colors.blackForText,
        }}
      >
        Recent
      </Text>
      <RecentCard />
      <RecentCard />
    </View>
  );
};

export default MainRecents;
