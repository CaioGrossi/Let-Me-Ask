import copyImg from "../../assets/images/copy.svg";

import * as S from "./styles";

type RoomCodeProps = {
  code: string;
};

const RoomCode = ({ code }: RoomCodeProps) => {
  function copyRoomCode() {
    navigator.clipboard.writeText(code);
  }

  return (
    <S.Wrapper onClick={copyRoomCode}>
      <S.IconWrapper>
        <img src={copyImg} alt="Copy icon" />
      </S.IconWrapper>

      <span>Sala {code}</span>
    </S.Wrapper>
  );
};

export default RoomCode;
