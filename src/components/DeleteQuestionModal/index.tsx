import deleteIcon from "../../assets/images/delete.svg";
import { database } from "../../services/firebase";
import Button from "../Button";
import Modal from "../Modal";
import * as S from "./styles";

type DeleteListModalProps = {
  roomId: string;
  questionId: string;
  isOpen: boolean;
  onCancel: () => void;
};

const DeleteListModal = ({
  roomId,
  questionId,
  isOpen,
  onCancel,
}: DeleteListModalProps) => {
  async function handleDeleteQuestion() {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    onCancel();
  }

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <S.Wrapper>
        <img src={deleteIcon} alt="Remover pergunta" />

        <S.Text>
          <h1>Excluir pergunta</h1>
          <p>Tem certeza que vocẽ deseja excluir essa pergunta?</p>
        </S.Text>

        <S.ButtonsWrapper>
          <Button color="gray" onClick={() => onCancel()}>
            Cancelar
          </Button>
          <Button color="red" onClick={() => handleDeleteQuestion()}>
            Excluir
          </Button>
        </S.ButtonsWrapper>
      </S.Wrapper>
    </Modal>
  );
};

export default DeleteListModal;
