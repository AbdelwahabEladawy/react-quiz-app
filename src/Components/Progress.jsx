import React from "react";

export default function Progress({
  questions,
  index,
  points,
  MaxPossibleScore,
}) {
  return (
    <header className="progress">
        <progress max={questions.length} value={index}></progress>
      <p>
        Question <strong>{index + 1}</strong>/{questions.length}
      </p>
      <p>Score : {points} /{MaxPossibleScore}</p>
    </header>
  );
}
