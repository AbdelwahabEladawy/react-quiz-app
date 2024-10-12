import React from "react";

export default function FinishScreen({ points, MaxPossibleScore ,dispatch }) {
  const percentage = Math.ceil((points / MaxPossibleScore) * 100);
  return (
    <>
      <p className="result">
        You Finish the Quiz and your score is{" "}
        <strong>
          {points} Out of {MaxPossibleScore} and your percentage is {percentage}%
        </strong>
      </p>

      <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
      Restart Quiz
    </button>
    </>
  );
}
