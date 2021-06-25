import styled, { css } from "styled-components";
import { ButtonProps } from ".";

type WrapperProps = Pick<
  ButtonProps,
  "size" | "color" | "minimal" | "fullWidth"
> & { hasIcon: boolean };

const wrapperModifiers = {
  small: () => css`
    width: 132px;
  `,
  medium: () => css`
    width: 163px;
  `,

  fullWidth: () => css`
    width: 100%;
  `,

  minimal: () => css`
    border: 1px solid #835afd;
    background-color: white;
    color: #835afd;
  `,
  red: () => css`
    background-color: #ea4335;
  `,
  purple: () => css`
    background-color: #835afd;
  `,
  gray: () => css`
    background-color: lightgrey;
  `,
  hasIcon: () => css`
    svg {
      width: 15px;
      margin-right: 8px;
    }
  `,
};

export const Wrapper = styled.button<WrapperProps>`
  ${({ size, color, minimal, fullWidth, hasIcon }) => css`
    height: 50px;
    border-radius: 8px;
    font-weight: 500;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 0;
    transition: filter 0.2s;
    padding: 0 32px;

    &:not(:disabled):hover {
      filter: brightness(0.9);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    ${!!color && wrapperModifiers[color]}
    ${!!size && wrapperModifiers[size]}
    ${!!fullWidth && wrapperModifiers.fullWidth()}
    ${!!hasIcon && wrapperModifiers.hasIcon()}
    ${!!minimal && wrapperModifiers.minimal()}
  `}
`;
