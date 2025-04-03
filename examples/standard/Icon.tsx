import React from "react";
import { useTheme } from "styled-components";
import * as Icons from "./partials/icons";

export interface IconCommonProps extends React.HTMLAttributes<HTMLElement> {
  color: string;
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  as?: keyof typeof Icons;
  size?: number | string;
  color?: string;
  variant?: "small" | "medium" | "large";
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
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={onClick ? "button" : "img"}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      {...rest}
    >
      <IconComponent color={color || theme.colors.primaryText} />
    </svg>
  );
};

export default Icon;
