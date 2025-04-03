import { motion } from "framer-motion";
import React from "react";
import { IconCommonProps } from "../../Icon";
import { basePathAnimation } from "../commons";

export const Edit: React.FC<IconCommonProps> = ({ color, ...props }) => (
  <g>
    <motion.path
      opacity="0.5"
      d="M22.1066 5.76009L11.9839 15.8813C10.9758 16.8892 7.98353 17.356 7.31504 16.6876C6.64655 16.0192 7.10282 13.0274 8.11086 12.0195L18.2443 1.88767C18.4942 1.61507 18.7967 1.39595 19.1337 1.24349C19.4706 1.09104 19.835 1.00839 20.2047 1.00061C20.5744 0.992829 20.942 1.06003 21.285 1.19817C21.6281 1.33632 21.9396 1.54256 22.2008 1.8044C22.4619 2.06623 22.6673 2.37825 22.8045 2.72163C22.9417 3.06502 23.008 3.43264 22.9992 3.80232C22.9904 4.172 22.9067 4.5361 22.7534 4.87257C22.5999 5.20905 22.38 5.51098 22.1066 5.76009Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...basePathAnimation(0.5)}
      {...props}
    />

    <motion.path
      d="M11 3H5.44444C4.2657 3 3.13531 3.46824 2.30181 4.30174C1.46832 5.13524 1 6.2657 1 7.44444V18.5556C1 19.7343 1.46832 20.8648 2.30181 21.6982C3.13531 22.5318 4.2657 23 5.44444 23H17.6667C20.1222 23 21 21 21 18.5556V13"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...basePathAnimation()}
      {...props}
    />
  </g>
);
