import React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

interface heartIconProps {
  fill: string;
}

export const HeartIcon: React.FC<heartIconProps> = ({ fill }) => (
  <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <Rect width="32" height="32" />
    <Circle cx="9.33459" cy="12.6673" r="7.27135" fill={fill} />
    <Circle cx="22.6654" cy="12.6673" r="7.27135" fill={fill} />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.98388 18.5041L14.8152 25.7329C15.5201 26.2512 16.4799 26.2512 17.1848 25.7329L27.0161 18.5041L16 12.6673L4.98388 18.5041Z"
      fill={fill}
    />
  </Svg>
);
