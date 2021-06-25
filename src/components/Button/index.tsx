import { ButtonHTMLAttributes } from "react";
import * as S from "./styles";

export type ButtonProps = {
  size?: "small" | "medium";
  color?: "red" | "purple" | "gray";
  minimal?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  icon,
  size = "medium",
  color = "purple",
  fullWidth = false,
  minimal = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <S.Wrapper
      size={size}
      color={color}
      fullWidth={fullWidth}
      minimal={minimal}
      hasIcon={!!icon}
      {...props}
    >
      {icon}
      {!!children && <span>{children}</span>}
    </S.Wrapper>
  );
};

export default Button;
