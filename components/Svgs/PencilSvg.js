import { SvgXml } from "react-native-svg";

export default svgComp = ({ color, thickness }) => {
  const svgMarkup =
    `<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.16645 21.2865L5.34219 21.6869L4.16645 21.2865L1.83572 28.1305C1.37664 29.4786 2.63407 30.7813 3.99751 30.3702L11.0361 28.2478C11.5496 28.093 12.0167 27.8135 12.3959 27.4343L29.8753 9.95495C31.1445 8.68575 31.1445 6.62796 29.8753 5.35876L27.0468 2.53033C25.7776 1.26113 23.7198 1.26113 22.4506 2.53033L4.94485 20.0361C4.59311 20.3879 4.32681 20.8156 4.16645 21.2865Z" stroke="` +
    color +
    `" stroke-width="` +
    thickness +
    `"/>
    </svg>
    
    `;

  return <SvgXml xml={svgMarkup} />;
};
