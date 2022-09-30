import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../../colors";

const windowHeight = Dimensions.get("window").height;

const ReviseAnswersPage = ({ examResults, examData, goHome }) => {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode={"never"}
        style={{ flex: 1 }}
      >
        {examData.map((t, i) => (
          <View key={i}>
            <View style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "VisbyRoundDemiBold",
                    fontSize: 21,
                    color: "#888",
                  }}
                >
                  Question {i + 1}/{examData.length}
                </Text>
                <Text
                  style={{
                    fontFamily: "VisbyRoundBold",
                    fontSize: 26,
                    color:
                      examResults.plrAnswerData.data[i] == t.ans
                        ? colors.green
                        : colors.red,
                  }}
                >
                  {examResults.plrAnswerData.data[i] == t.ans
                    ? "Solved Correctly!"
                    : "Incorrect"}
                </Text>
              </View>
              <View>
                <Image
                  style={{
                    width: "100%",
                    aspectRatio: 1.2,
                  }}
                  source={{ uri: t.ques }}
                />
              </View>
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "VisbyRoundBold",
                    fontSize: 26,
                    color: "#404053",
                  }}
                >
                  Correct Answer: {t.ans}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: 200,
                height: 2,
                backgroundColor: "#D9D9D9",
                alignSelf: "center",
                borderRadius: 20,
                marginTop: 20,
                marginBottom: 20,
              }}
            />
          </View>
        ))}
        <View style={{ height: 88 }} />
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.98}
        onPress={goHome}
        style={{
          position: "absolute",
          width: "100%",
          height: 70,
          bottom: 10,
          alignItems: "center",
          elevation: 5,
        }}
      >
        <View
          style={{
            backgroundColor: colors.purple,
            width: "90%",
            height: "100%",
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "VisbyRoundBold",
              fontSize: 26,
              color: "#fff",
            }}
          >
            Done
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ReviseAnswersPage;
