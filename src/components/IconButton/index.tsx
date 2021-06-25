import { renderIcon } from "./utils";
import { ButtonHTMLAttributes } from "react";
import * as S from "./styles";

export type IconButtonProps = {
  iconType: "like" | "delete" | "answer" | "check";
  isMarked?: boolean;
  text?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({
  iconType,
  isMarked = false,
  text,
  ...props
}: IconButtonProps) => {
  return (
    <S.Wrapper isMarked={isMarked} hasText={!!text} {...props}>
      {text && <span>{text}</span>}
      {renderIcon(iconType)}
    </S.Wrapper>
  );
};

export default IconButton;
