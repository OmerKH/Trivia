import React, { useContext, useState } from "react";
import { ApiContext } from "../providers/ApiProvider";
import Question from "./Question";

const Quiz = () => {
  const { questions, selected } = useContext(ApiContext);

  return (
    <div>
      {JSON.stringify(selected)}
      {questions.map((question, i) => (
        <Question
          // selected={selected[i]}
          questionIndex={i}
          key={i}
          question={question}
        />
      ))}
    </div>
  );
};

export default Quiz;
