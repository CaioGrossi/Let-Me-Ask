import * as S from "./styles";

type UserInfoProps = {
  name: string;
  avatar: string;
};

const UserInfo = ({ name, avatar }: UserInfoProps) => {
  return (
    <S.Wrapper>
      <img src={avatar} alt={name} />
      <span>{name}</span>
    </S.Wrapper>
  );
};

export default UserInfo;
