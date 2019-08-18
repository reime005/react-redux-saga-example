import React from "react";
import { connect } from "react-redux";
import { testSagaAction } from "./store/rootSaga";
import { resetAction } from "./store/rootReducer";

const Button = ({ onClick, text }) => (
  <button
    style={{
      fontSize: 14,
      backgroundColor: "green",
      border: 0,
      padding: 15,
      borderRadius: 8,
      color: "#fff"
    }}
    onClick={onClick}
  >
    {text}
  </button>
);

const _Home = ({ counter, makeCall, reset }) => {
  return (
    <div>
      <h1>Counter</h1>
      <p>The counter will be increased after 1 second.</p>
      <p>{counter}</p>
      <div>
        <Button onClick={() => makeCall()} text="Click as often as you want!" />
        <Button onClick={() => reset()} text="Reset!" />
      </div>
    </div>
  );
};

export const Home = connect(
  state => ({
    counter: state.exampleReducer.counter
  }),
  dispatch => ({
    reset: () => dispatch(resetAction()),
    makeCall: () => dispatch(testSagaAction())
  })
)(_Home);
