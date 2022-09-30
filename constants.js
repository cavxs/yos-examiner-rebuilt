// For the nav bar
const HomeScreen = "HOMESCREEN";
const PencilScreen = "PENCILSCREEN";
const OptionsScreen = "OPTIONSSCREEN";

export const NavBarScreens = { HomeScreen, PencilScreen, OptionsScreen };

const GeometryCard = "Geometry";
const Math1Card = "Math1";
const Math2Card = "Math2";
const IQCard = "Iq";

export const SubjectSelection = { GeometryCard, Math1Card, Math2Card, IQCard };

export const SubjectGradientValues = {
  Math1: ["rgba(239, 139, 111, 1)", "rgba(242, 204, 144, 1)"],
  Geometry: ["rgba(127, 214, 171, 1)", "rgba(145, 101, 166, 1)"],
  MATH2: ["rgba(127, 214, 171, 1)", "rgba(242, 204, 144, 1)"],
  Iq: ["rgba(239, 139, 111, 1)", "rgba(191, 161, 205, 1)"],
};

export const shadowValues = { shadowDown: 0, shadowUpHidden: 200 }; // What are the y (height actually) values for the rotated navbar?
