import { type } from "@testing-library/user-event/dist/type";
import React from "react";

export default function Options({ questions, dispatch, answer }) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <div className="options">
        {questions.options.map((option, index) => (
          <button
            key={option}
            disabled={answer !== null}
            className={`btn btn-option  ${index === answer ? "answer" : ""} ${
              answer !== null
                ? index === questions.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            } `}
            onClick={() => dispatch({ type: "answer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
