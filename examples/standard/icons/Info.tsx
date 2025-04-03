import React from "react";
import { IconCommonProps } from "../../Icon";

export const Info: React.FC<IconCommonProps> = ({ color, ...props }) => (
  <g>
    <path
      opacity="0.5"
      d="M12 17V11"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    />

    <path
      opacity="0.5"
      d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
      fill={color}
      {...props}
    />

    <path
      d="M6.39819 2.41398C8.01615 1.47805 9.89465 0.942383 11.8982 0.942383C17.9733 0.942383 22.8982 5.86725 22.8982 11.9424C22.8982 18.0175 17.9733 22.9424 11.8982 22.9424C5.82306 22.9424 0.898193 18.0175 0.898193 11.9424C0.898193 9.93884 1.43386 8.06034 2.3698 6.44238"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    />
  </g>
);
