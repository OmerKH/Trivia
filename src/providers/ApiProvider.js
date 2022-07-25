import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import shuffle from "../utils/shuffle";
import { nanoid } from "nanoid";

export const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const res = await fetch("https://opentdb.com/api.php?amount=5");
    const data = await res.json();
    buildQuiz(data.results);
  };

  const buildQuiz = (getQuestions) => {
    setQuestions(
      getQuestions.map((question) => {
        const options = shuffle([
          {
            id: nanoid(),
            text: question.correct_answer,
            correct: true,
            selected: false,
            isCorrect: false,
            isIncorrect: false,
            checked: false,
          },
          ...question.incorrect_answers.map((q) => ({
            id: nanoid(),
            text: q,
            correct: false,
            selected: false,
            isCorrect: false,
            isIncorrect: false,
            checked: false,
          })),
        ]);
        return {
          questionText: question.question,
          id: nanoid(),
          options: options,
        };
      })
    );
  };

  // const updateSelection = useCallback(
  //   (questionIndex, optionIndex) => {
  //     const _selected = selected;
  //     _selected[questionIndex] = optionIndex;
  //     setSelected(_selected);
  //   },
  //   [selected]
  // );

  const updateSelection = useCallback((answerId, questionId) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((question) => {
        if (question.id === questionId) {
          const answerList = question.options.map((answer) => {
            if (answer.id === answerId || answer.selected) {
              return {
                ...answer,
                selected: !answer.selected,
              };
            } else {
              return answer;
            }
          });
          return {
            ...question,
            options: answerList,
          };
        } else {
          return question;
        }
      })
    );
  }, []);

  const apiValue = useMemo(
    () => ({
      questions,
      setQuestions,
      getQuestions,
      updateSelection,
      selected,
    }),
    [questions, setQuestions, getQuestions, selected, updateSelection]
  );

  return <ApiContext.Provider value={apiValue}>{children}</ApiContext.Provider>;
};
