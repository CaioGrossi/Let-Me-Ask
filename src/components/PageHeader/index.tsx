import RoomCode from "../RoomCode";
import Button from "../Button";
import logoImg from "../../assets/images/logo.svg";
import { database } from "../../services/firebase";
import { Link, useHistory } from "react-router-dom";

import * as S from "./styles";

type PageHeaderProps = {
  isAdmin?: boolean;
  roomId: string;
};

const PageHeader = ({ isAdmin = false, roomId }: PageHeaderProps) => {
  const history = useHistory();

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  return (
    <S.Wrapper>
      <S.Content>
        <Link to="/">
          <img src={logoImg} alt="Imagem da logo" />
        </Link>
        <RoomCode code={roomId} />
        {isAdmin && (
          <Button minimal onClick={handleEndRoom}>
            Encerrar sala
          </Button>
        )}
      </S.Content>
    </S.Wrapper>
  );
};

export default PageHeader;
