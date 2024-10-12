import React from "react";

export default function NextButton({ dispatch, answer, index,NoOFQuest}) {
  if (answer === null) return null;
  if (index < NoOFQuest-1)  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
      Next
    </button>
  );
  if (index === NoOFQuest-1)  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "finished" })}>
      finish
    </button>
  );
}
