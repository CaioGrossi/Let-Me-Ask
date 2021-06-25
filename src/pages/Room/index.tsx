import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/Button";
import Question from "../../components/Question";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../hooks/useAuth";
import useRoom from "../../hooks/useRoom";
import UserInfo from "../../components/UserInfo";
import { database } from "../../services/firebase";

import * as S from "./styles";
import IconButton from "../../components/IconButton";
import PageHeader from "../../components/PageHeader";

type RoomParams = {
  id: string;
};

const Room = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleCreateNewQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  return (
    <S.Wrapper>
      <PageHeader roomId={roomId} />

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

        <S.QuestionForm onSubmit={handleCreateNewQuestion}>
          <textarea
            placeholder="O que voce quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <S.FormFooter>
            {user === undefined ? (
              <Spinner />
            ) : (
              <>
                {user !== null ? (
                  <UserInfo name={user.name} avatar={user.avatar} />
                ) : (
                  <span>
                    Para enviar uma perguntar, <button>faça seu login</button>
                  </span>
                )}
              </>
            )}

            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </S.FormFooter>
        </S.QuestionForm>

        <S.QuestionWrapper>
          {title ? (
            <>
              {questions.map((question) => {
                return (
                  <Question
                    key={question.id}
                    content={question.content}
                    author={question.author}
                    isAnswered={question.isAnswered}
                    isHighlighted={question.isHighlighted}
                  >
                    {!question.isAnswered && (
                      <IconButton
                        iconType="like"
                        text={String(question.likeCount)}
                        type="button"
                        aria-label="Marcar como gostei"
                        isMarked={question.likeCount > 0}
                        onClick={() =>
                          handleLikeQuestion(question.id, question.likeId)
                        }
                      />
                    )}
                  </Question>
                );
              })}
            </>
          ) : (
            <Spinner size={150} />
          )}
        </S.QuestionWrapper>
      </S.Content>
    </S.Wrapper>
  );
};

export default Room;
