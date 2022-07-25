import { useContext } from "react";
import { ApiContext } from "../providers/ApiProvider";

const Question = ({ question, id }) => {
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
            style={
              option.checked && option.correct
                ? { backgroundColor: "#94D7A2", border: "none" }
                : option.checked && option.isIncorrect
                ? { backgroundColor: "#F8BCBC", opacity: 0.5, border: "none" }
                : {
                    backgroundColor: option.selected ? "#D6DBF5" : "white",
                    border: "none",
                  }
            }
            onClick={() => updateSelection(option.id, id)}
            dangerouslySetInnerHTML={{ __html: option.text }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Question;
