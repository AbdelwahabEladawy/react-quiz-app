import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondRemaining: null,
};

const questionTime = 25;
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "Error" };
    case "active":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * questionTime,
      };
    case "answer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };

    case "next":
      return { ...state, index: state.index + 1, answer: null };

    case "finished":
      return { ...state, status: "finished" };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const NoOFQuest = state.questions.length;

  const MaxPossibleScore = state.questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="container">
      <Header />
      <Main>
        {state.status === "loading" && <Loader></Loader>}
        {state.status === "Error" && <Error></Error>}
        {state.status === "ready" && (
          <StartScreen
            questions={state.questions}
            dispatch={dispatch}
          ></StartScreen>
        )}
        {state.status === "active" && (
          <>
            <Progress
              questions={state.questions}
              index={state.index}
              points={state.points}
              MaxPossibleScore={MaxPossibleScore}
            ></Progress>

            <Question
              questions={state.questions[state.index]}
              dispatch={dispatch}
              answer={state.answer}
            ></Question>
            <footer>
              <NextButton
                dispatch={dispatch}
                answer={state.answer}
                index={state.index}
                NoOFQuest={NoOFQuest}
              ></NextButton>

              <Timer
                dispatch={dispatch}
                secondRemaining={state.secondRemaining}
              />
            </footer>
          </>
        )}

        {state.status === "finished" && (
          <FinishScreen
            points={state.points}
            MaxPossibleScore={MaxPossibleScore}
            questions={state.questions.length}
            index={state.index}
            NoOFQuest={NoOFQuest}
            dispatch={dispatch}
          ></FinishScreen>
        )}

        {state.status === "restart"}
      </Main>
    </div>
  );
}

export default App;
