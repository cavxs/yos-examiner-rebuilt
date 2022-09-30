import {
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";

import { useRef, useState, useEffect } from "react";

import GeometryCard from "../../assets/appimages/subjectselection/Geometry.png";
import MathICard from "../../assets/appimages/subjectselection/Math1.png";
import MathIICard from "../../assets/appimages/subjectselection/Math2.png";
import IQCard from "../../assets/appimages/subjectselection/IQ.png";

import { SubjectSelection } from "../../constants";

const WINDOW_WIDTH = Dimensions.get("window").width;

import colors from "../../colors";

const SubjectSelectionPage = ({ selectSubject1 }) => {
  const selectTranslation = useRef(new Animated.Value(0)).current;
  const nonSelectedOpacity = useRef(new Animated.Value(0)).current;
  const [selectedSubject, setSelectedSubject] = useState(0);

  // useEffect(() => {
  //   setSelectedSubject("");
  // }, []);

  const selectSubject = (sub) => {
    if (!(selectedSubject == "")) return;
    setSelectedSubject(sub);
    selectTranslation.setValue(0);
    nonSelectedOpacity.setValue(1);
    onSelected(sub);
  };

  const onSelected = (sub) => {
    Animated.timing(selectTranslation, {
      toValue: 500,
      duration: 325,
      useNativeDriver: true,
    }).start(() => {
      selectSubject1(sub);
    });
    Animated.timing(nonSelectedOpacity, {
      toValue: 0,
      duration: 250,
      delay: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1, paddingTop: 30, backgroundColor: colors.lightOrange }}
      >
        <TouchableOpacity
          onPress={() => selectSubject(SubjectSelection.GeometryCard)}
          activeOpacity={0.7}
        >
          <Animated.Image
            source={GeometryCard}
            style={[
              styles.card,
              {
                transform: [
                  {
                    translateX:
                      selectedSubject == SubjectSelection.GeometryCard
                        ? selectTranslation
                        : 0,
                  },
                ],
                opacity:
                  selectedSubject.length &&
                  !(selectedSubject == SubjectSelection.GeometryCard)
                    ? nonSelectedOpacity
                    : 1,
              },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => selectSubject(SubjectSelection.Math1Card)}
          activeOpacity={0.7}
        >
          <Animated.Image
            source={MathICard}
            style={[
              styles.card,
              {
                transform: [
                  {
                    translateX:
                      selectedSubject == SubjectSelection.Math1Card
                        ? selectTranslation
                        : 0,
                  },
                ],
                opacity:
                  selectedSubject.length &&
                  !(selectedSubject == SubjectSelection.Math1Card)
                    ? nonSelectedOpacity
                    : 1,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectSubject(SubjectSelection.Math2Card)}
          activeOpacity={0.7}
        >
          <Animated.Image
            source={MathIICard}
            style={[
              styles.card,
              {
                transform: [
                  {
                    translateX:
                      selectedSubject == SubjectSelection.Math2Card
                        ? selectTranslation
                        : 0,
                  },
                ],
                opacity:
                  selectedSubject.length &&
                  !(selectedSubject == SubjectSelection.Math2Card)
                    ? nonSelectedOpacity
                    : 1,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectSubject(SubjectSelection.IQCard)}
          activeOpacity={0.7}
        >
          <Animated.Image
            source={IQCard}
            style={[
              styles.card,
              {
                transform: [
                  {
                    translateX:
                      selectedSubject == SubjectSelection.IQCard
                        ? selectTranslation
                        : 0,
                  },
                ],
                opacity:
                  selectedSubject.length &&
                  !(selectedSubject == SubjectSelection.IQCard)
                    ? nonSelectedOpacity
                    : 1,
                marginBottom: 20,
              },
            ]}
          />
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    resizeMode: "contain",
    marginTop: -10,
    marginBottom: -20,
    width: WINDOW_WIDTH,
  },
});

export default SubjectSelectionPage;
