import React, { useState } from "react";
import { createContext } from "react";
import TestCompB from "../components/test/TestCompB";

type contextType = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

export const nameContext = createContext<contextType>(undefined);

export default function Test() {
  const [name, setName] = useState("きくらげ");

  return (
    <nameContext.Provider value={{ name: name, setName: setName }}>
      <TestCompB />
    </nameContext.Provider>
  );
}
