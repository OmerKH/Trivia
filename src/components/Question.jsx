import { useContext } from "react";
import { ApiContext } from "../providers/ApiProvider";

const Question = ({
  question,
  questionIndex,
  selected,
  id,
  selectAnOption,
}) => {
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
            style={{
              backgroundColor: option.selected ? "#D6DBF5" : "white",
              border: "none",
            }}
            onClick={() => updateSelection(option.id, id)}
            dangerouslySetInnerHTML={{ __html: option.text }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Question;
