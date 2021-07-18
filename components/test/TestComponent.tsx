import React, { useCallback } from "react";
import { useContext } from "react";
import { Context } from "../../pages/context";

export default function TestComponent() {
  const { state, dispatch } = useContext(Context);
  const increment = useCallback(
    () => dispatch({ type: "INCREMENT", payload: 3 }),
    []
  );
  const decrement = useCallback(
    () => dispatch({ type: "DECREMENT", payload: 3 }),
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
