import React, { useContext } from "react";
import { ApiContext } from "../providers/ApiProvider";
import Question from "./Question";
import Home from "./Home";
const Quiz = () => {
  const { questions, testQuiz, startGame, newGame, start, checked, score } =
    useContext(ApiContext);

  return (
    <div className="quiz">
      {!start ? (
        <Home startGame={startGame} />
      ) : (
        <div className="gmae-on">
          {questions.map((question, i) => (
            <Question
              id={question.id}
              questionIndex={i}
              key={i}
              question={question}
            />
          ))}
          <section className="btn--section">
            {checked ? (
              <div className="check">
                <span className="score">
                  You scored {score}/5 correct answers
                </span>
                <button className="start-btn" onClick={newGame}>
                  Play Again
                </button>
              </div>
            ) : (
              <button className="start-btn" onClick={testQuiz}>
                Check answers
              </button>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default Quiz;
