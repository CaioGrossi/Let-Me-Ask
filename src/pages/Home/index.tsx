import backgroundImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import { useHistory } from "react-router-dom";
import { Google } from "@styled-icons/bootstrap/Google";
import { database } from "../../services/firebase";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { useAuth } from "../../hooks/useAuth";

import { FormEvent, useState } from "react";
import * as S from "./styles";

const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error("Room doesn't exist");
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error("Room already closed");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <S.Wrapper>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ fontSize: "16px" }}
      />
      <S.Banner>
        <img src={backgroundImg} alt="Imagem de troca de respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiencia em tempo real</p>
      </S.Banner>

      <S.FormWrapper>
        <S.FormContent>
          <img src={logoImg} alt="Logo da aplicacao" />

          <Button
            color="red"
            fullWidth
            icon={<Google />}
            onClick={() => handleCreateRoom()}
          >
            Crie sua sala com o google
          </Button>

          <S.Divider>ou entre em uma sala</S.Divider>

          <S.Form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />

            <Button type="submit" fullWidth>
              Entrar na sala
            </Button>
          </S.Form>
        </S.FormContent>
      </S.FormWrapper>
    </S.Wrapper>
  );
};

export default Home;
