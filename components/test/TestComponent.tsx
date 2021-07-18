import React, { useCallback } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { UserContext } from "../../pages/context";

export default function TestComponent() {
  const { state, dispatch } = useContext(UserContext);
  const increment = useCallback(
    () => dispatch({ type: "INCREMENT", payload: 5 }),
    []
  );
  const decrement = useCallback(
    () => dispatch({ type: "DECREMENT", payload: 5 }),
    []
  );
  return (
    <>
      <h1>TestComponent</h1>
      {state.count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}
