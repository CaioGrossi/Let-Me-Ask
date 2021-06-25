import UserInfo from "../UserInfo";

import * as S from "./styles";

export type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children: React.ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

const Question = ({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) => {
  return (
    <S.Wrapper isAnswered={isAnswered} isHighlighted={isHighlighted}>
      <p>{content}</p>
      <footer>
        <UserInfo name={author.name} avatar={author.avatar} />
        <S.Controls>{children}</S.Controls>
      </footer>
    </S.Wrapper>
  );
};

export default Question;
