import React from "react";

export default function StartScreen({ questions, dispatch }) {
  return (
  
      <div className="start">
        <h2>Welcome To React Quiz !!</h2>
        <h3>{questions.length} question to test your react mastery</h3>
        <button
          className="btn btn-ui"
          onClick={() => {
            dispatch({ type: "active" });
          }}
        >
          Let's Start
        </button>
      </div>

  );
}
