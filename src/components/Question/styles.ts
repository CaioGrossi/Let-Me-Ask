import styled, { css } from "styled-components";
import { QuestionProps } from ".";

type WrapperProps = Pick<QuestionProps, "isAnswered" | "isHighlighted">;

const wrapperModifiers = {
  isAnswered: () => css`
    background-color: #dbdcdd;
  `,
  isHighlighted: () => css`
    background-color: #f4f0ff;
    border: 1px solid #835afd;
  `,
};

export const Wrapper = styled.div<WrapperProps>`
  ${({ isAnswered, isHighlighted }) => css`
    background-color: #fefefe;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    padding: 24px;

    & + & {
      margin-top: 8px;
    }

    > p {
      color: "#29292e";
    }

    footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
    }
    ${isAnswered && wrapperModifiers.isAnswered()}
    ${isHighlighted && !isAnswered && wrapperModifiers.isHighlighted()}
  `}
`;

export const Controls = styled.div`
  display: flex;
  gap: 16px;

  button {
    border: 0;
    background: transparent;
    cursor: pointer;

    &.like-button {
      display: flex;
      align-items: flex-end;
      color: #737380;
      gap: 8px;

      &.liked {
        color: #835afd;

        svg path {
          stroke: #835afd;
        }
      }
    }
  }
`;
