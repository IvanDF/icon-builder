import { motion, SVGMotionProps } from "framer-motion";
import React from "react";
import { useTheme } from "styled-components";
import * as Icons from "./partials/icons";

export interface IconCommonProps
  extends React.ComponentProps<typeof motion.path> {
  color: string;
}

export interface IconProps extends React.ComponentProps<typeof motion.svg> {
  as?: keyof typeof Icons;
  size?: number | string;
  color?: string;
  variant?: "small" | "medium" | "large";
  pathAnimation?: SVGMotionProps<SVGPathElement>;
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const sizeMap = {
  small: 16,
  medium: 24,
  large: 32,
};

export const Icon: React.FC<IconProps> = ({
  size,
  color,
  variant = "medium",
  onClick,
  pathAnimation,
  as = "Info",
  ...rest
}) => {
  const theme = useTheme();
  const dimension = size || sizeMap[variant];

  const IconComponent = Icons[as];

  const handleKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      onClick(e as any);
    }
  };

  return (
    <motion.svg
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={onClick ? "button" : "img"}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.2 } : undefined}
      whileTap={onClick ? { scale: 0.8 } : undefined}
      {...rest}
    >
      <IconComponent
        {...pathAnimation}
        color={color || theme.colors.primaryText}
      />
    </motion.svg>
  );
};

export default Icon;
