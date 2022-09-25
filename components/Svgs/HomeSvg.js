import { SvgXml } from "react-native-svg";

export default svgComp = ({ color, thickness }) => {
  const svgMarkup =
    `<svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.71542 13.5514L16.2154 3.07648C16.9586 2.4537 18.0414 2.4537 18.7846 3.07647L31.2846 13.5514C31.738 13.9314 32 14.4927 32 15.0843V28C32 29.1046 31.1046 30 30 30H5C3.89543 30 3 29.1046 3 28V15.0843C3 14.4927 3.26195 13.9314 3.71542 13.5514Z" stroke="` +
    color +
    `" stroke-width="` +
    thickness +
    `"/>
    </svg>
    `;

  return <SvgXml xml={svgMarkup} />;
};
