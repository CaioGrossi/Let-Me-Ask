import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  border-radius: 12px;

  text-align: center;

  > img {
    width: 50px;
    height: 50px;
  }
`;
export const Text = styled.div`
  margin: 35px 0;
`;

export const ButtonsWrapper = styled.div`
  margin-top: 10px;
  display: flex;

  gap: 10px;
`;
