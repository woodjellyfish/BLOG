import React, { useContext } from "react";
import { nameContext } from "../../pages/test";

export default function TestCompB() {
  const { name, setName } = useContext(nameContext);
  return (
    <>
      <div>{name}</div>
      <button onClick={() => setName("くらげ")}>click</button>
    </>
  );
}
