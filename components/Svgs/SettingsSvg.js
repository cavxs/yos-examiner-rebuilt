import { SvgXml } from "react-native-svg";

export default svgComp = ({ color }) => {
  const svgMarkup =
    `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="2.50003" width="25" height="2.25" rx="1.125" fill="` +
    color +
    `"/>
    <rect y="11.5" width="25" height="2.25" rx="1.125" fill="` +
    color +
    `"/>
    <rect y="20.5" width="25" height="2.25" rx="1.125" fill="` +
    color +
    `"/>
    <rect x="5.5" width="2.5" height="7" rx="1.25" fill="` +
    color +
    `"/>
    <rect x="17.5" y="9" width="2.5" height="7" rx="1.25" fill="` +
    color +
    `"/>
    <rect x="9.5" y="18" width="2.5" height="7" rx="1.25" fill="` +
    color +
    `"/>
    </svg>
    `;

  return <SvgXml style={{ marginTop: -40 }} xml={svgMarkup} />;
};
