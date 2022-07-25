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
  const [score, setScore] = useState(0);
  const [game, setGame] = useState(false);
  const [checked, setChecked] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    getQuestions();
  }, [game]);

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

  const testQuiz = useCallback(() => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((question) => {
        const checkedOptions = question.options.map((option) => {
          if (option.selected && !option.correct) {
            return {
              ...option,
              isIncorrect: true,
              checked: true,
            };
          } else if (option.selected && option.correct) {
            setScore((prevScore) => prevScore + 1);
            return {
              ...option,
              isCorrect: true,
              checked: true,
            };
          } else {
            return {
              ...option,
              checked: true,
            };
          }
        });
        return {
          ...question,
          options: checkedOptions,
        };
      })
    );
    setChecked(true);
  }, []);

  const startGame = useCallback(() => {
    setStart(true);
  }, []);

  const newGame = useCallback(() => {
    setGame((prevGame) => !prevGame);
    setChecked(false);
    setScore(0);
  }, []);

  const apiValue = useMemo(
    () => ({
      questions,
      start,
      checked,
      score,
      setQuestions,
      getQuestions,
      updateSelection,
      testQuiz,
      startGame,
      newGame,
    }),
    [
      questions,
      start,
      checked,
      score,
      setQuestions,
      getQuestions,
      updateSelection,
      testQuiz,
      startGame,
      newGame,
    ]
  );

  return <ApiContext.Provider value={apiValue}>{children}</ApiContext.Provider>;
};
