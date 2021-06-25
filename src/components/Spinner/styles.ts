import styled, { css } from "styled-components";
import { SpinnerProps } from ".";

type WrapperProps = Pick<SpinnerProps, "size">;

export const Wrapper = styled.div<WrapperProps>`
  ${({ size }) => css`
    > svg {
      width: ${size}px;
      height: ${size}px;
    }
  `}
`;
