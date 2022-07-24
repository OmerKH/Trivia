import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

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

  const buildQuiz =(getQuestions) => {
    setQuestions(getQuestions.map(question => {
      const options =
    }))
  }

  const updateSelection = useCallback(
    (questionIndex, optionIndex) => {
      const _selected = selected;
      _selected[questionIndex] = optionIndex;
      setSelected(_selected);
    },
    [selected]
  );

  const apiValue = useMemo(
    () => ({
      questions,
      getQuestions,
      selected,
      updateSelection,
    }),
    [questions, selected, updateSelection]
  );

  return <ApiContext.Provider value={apiValue}>{children}</ApiContext.Provider>;
};
