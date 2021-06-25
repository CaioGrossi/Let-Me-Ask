import backgroundImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import { Link, useHistory } from "react-router-dom";
import Button from "../../components/Button";
import { FormEvent, useState } from "react";

import * as S from "./styles";
import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const { user } = useAuth();
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (roomName.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: roomName,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <S.Wrapper>
      <S.Banner>
        <img src={backgroundImg} alt="Imagem de troca de respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiencia em tempo real</p>
      </S.Banner>

      <S.FormWrapper>
        <S.FormContent>
          <img src={logoImg} alt="Logo da aplicacao" />
          <h2>Criar uma nova sala</h2>

          <S.Form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setRoomName(event.target.value)}
              value={roomName}
            />
            <Button type="submit">Criar sala</Button>
          </S.Form>

          <p>
            Quer entrar em uma sala existente?
            <Link to="/">Clique aqui</Link>
          </p>
        </S.FormContent>
      </S.FormWrapper>
    </S.Wrapper>
  );
};

export default CreateRoom;
