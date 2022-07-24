import { useContext } from "react";
import { ApiContext } from "../providers/ApiProvider";

const Question = ({ question, questionIndex, selected }) => {
  const { updateSelection } = useContext(ApiContext);

  return (
    <div className="question">
      <div
        className="question-text"
        dangerouslySetInnerHTML={{ __html: question.questionText }}
      ></div>
      <div className="options">
        {[...question.options].map((option, i) => (
          <button
            key={i}
            className="opt-btn"
            style={{ backgroundColor: selected === i ? "blue" : "white" }}
            onClick={() => updateSelection(questionIndex, i)}
            dangerouslySetInnerHTML={{ __html: option.text }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Question;
