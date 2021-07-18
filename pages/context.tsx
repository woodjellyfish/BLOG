import React, { createContext, useReducer } from "react";
import TestComponent from "../components/test/TestComponent";

type STORE = {
  count: number;
};

type ACTIONTYPE = { type: "INCREMENT" } | { type: "DECREMENT" };

type PAYLOAD = {
  payload: number;
};

type VALUE = {
  state: STORE;
  dispatch: React.Dispatch<ACTIONTYPE & PAYLOAD>;
};

const initialState = {
  count: 100,
};

export const Context = createContext<VALUE>(undefined);

export default function test() {
  const reducer: React.Reducer<STORE, ACTIONTYPE & PAYLOAD> = (
    state,
    action
  ) => {
    switch (action.type) {
      case "INCREMENT":
        return { count: state.count + action.payload };
      case "DECREMENT":
        return { count: state.count - action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: VALUE = {
    state: state,
    dispatch: dispatch,
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>useContextTest</h1>
      <h2>{state.count}</h2>

      <Context.Provider value={value}>
        <TestComponent />
      </Context.Provider>
    </div>
  );
}
