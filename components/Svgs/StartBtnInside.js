import { SvgXml } from "react-native-svg";

export default svgComp = ({ style }) => {
  const svgMarkup = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.7689 5.82829C16.9495 6.942 16.9495 10.058 14.7689 11.1717L4.86453 16.2302C2.86844 17.2497 0.5 15.7998 0.5 13.5585V3.44153C0.5 1.20017 2.86843 -0.249654 4.86453 0.769818L14.7689 5.82829Z" fill="#452D50"/>
    </svg>
    
    `;

  return <SvgXml style={style} xml={svgMarkup} />;
};
