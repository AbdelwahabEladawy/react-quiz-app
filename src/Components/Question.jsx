import React from "react";
import Options from "./Options";

export default function Question({ questions ,answer,dispatch}) {
  // console.log(questions);

  return <Options questions={questions} answer={answer} dispatch={dispatch}></Options>;
}
