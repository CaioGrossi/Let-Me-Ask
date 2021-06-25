import styled, { css } from "styled-components";
import { IconButtonProps } from ".";

type WrapperProps = Pick<IconButtonProps, "isMarked"> & {
  hasText: boolean;
};

const wrapperModifiers = {
  isMarked: () => css`
    color: #835afd;

    svg path {
      stroke: #835afd;
    }

    svg circle {
      stroke: #835afd;
    }
  `,

  hasText: () => css`
    display: flex;
    align-items: flex-end;
    color: #737380;
    gap: 8px;
  `,
};

export const Wrapper = styled.button<WrapperProps>`
  ${({ isMarked, hasText }) => css`
    border: 0;
    background: transparent;
    cursor: pointer;

    &:hover {
      color: #835afd;

      svg path {
        stroke: #835afd;
      }

      svg circle {
        stroke: #835afd;
      }
    }

    ${hasText && wrapperModifiers.hasText()}
    ${isMarked && wrapperModifiers.isMarked()}
  `}
`;
