import { useParams } from "react-router-dom";
import Question from "../../components/Question";
import useRoom from "../../hooks/useRoom";
import { database } from "../../services/firebase";
import Spinner from "../../components/Spinner";
import IconButton from "../../components/IconButton";
import PageHeader from "../../components/PageHeader";

import { useState } from "react";
import DeleteQuestionModal from "../../components/DeleteQuestionModal";
import * as S from "./styles";

type RoomParams = {
  id: string;
};

const AdminRoom = () => {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [isDeleteQuestionModalOpen, setIsDeleteQuestionModalOpen] =
    useState(false);

  const [currentDeleteQuestionId, setCurrentDeleteQuestionId] = useState("");

  const { title, questions } = useRoom(roomId);

  async function handleCheckQuestion(questionId: string, isChecked: boolean) {
    if (isChecked) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: false,
      });
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: true,
      });
    }
  }

  async function handleHighlightQuestion(
    questionId: string,
    isHighlighted: boolean
  ) {
    if (isHighlighted) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: false,
      });
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true,
      });
    }
  }

  return (
    <S.Wrapper>
      <PageHeader roomId={roomId} isAdmin />

      <DeleteQuestionModal
        roomId={roomId}
        questionId={currentDeleteQuestionId}
        isOpen={isDeleteQuestionModalOpen}
        onCancel={() => {
          setIsDeleteQuestionModalOpen(false);
          setCurrentDeleteQuestionId("");
        }}
      />

      <S.Content>
        <S.RoomHeader>
          {title ? (
            <>
              <h1>{title}</h1>
              {questions.length > 0 ? (
                <span>{questions.length} pergunta(s)</span>
              ) : (
                <span>Nenhuma pergunta</span>
              )}
            </>
          ) : (
            <Spinner />
          )}
        </S.RoomHeader>

        <S.QuestionWrapper>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                <IconButton
                  iconType="check"
                  type="button"
                  isMarked={question.isAnswered}
                  onClick={() =>
                    handleCheckQuestion(question.id, question.isAnswered)
                  }
                />

                <IconButton
                  iconType="answer"
                  type="button"
                  isMarked={question.isHighlighted}
                  onClick={() =>
                    handleHighlightQuestion(question.id, question.isHighlighted)
                  }
                />

                <IconButton
                  iconType="delete"
                  type="button"
                  onClick={() => {
                    setIsDeleteQuestionModalOpen(true);
                    setCurrentDeleteQuestionId(question.id);
                  }}
                />
              </Question>
            );
          })}
        </S.QuestionWrapper>
      </S.Content>
    </S.Wrapper>
  );
};

export default AdminRoom;
