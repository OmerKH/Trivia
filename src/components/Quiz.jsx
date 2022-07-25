import { nanoid } from "nanoid";
import React, { useContext, useState } from "react";
import { ApiContext } from "../providers/ApiProvider";
import Question from "./Question";

const Quiz = () => {
  const { questions, setQuestions, selected } = useContext(ApiContext);

  return (
    <div className="quiz">
      {/* {JSON.stringify(selected)} */}
      {questions.map((question, i) => (
        <Question
          id={question.id}
          // selected={selected[i]}
          // selectAnOption={selectAnOption}
          questionIndex={i}
          key={i}
          question={question}
        />
      ))}
    </div>
  );
};

export default Quiz;
