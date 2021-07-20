import React, { useState } from "react";
import { createContext } from "react";
import TestCompB from "../components/test/TestCompB";

export default function Test() {
  const [name, setName] = useState("きくらげ");
  const [style, setStyle] = useState("bg-white");

  const handleClick = (color: string) => {
    setStyle(`bg-${color}-300`);
  };
  return (
    <>
      <div className={style}>{name}</div>
      <button className="bg-red-300 w-80" onClick={() => handleClick("red")}>
        red
      </button>
      <button className="bg-blue-300 w-80" onClick={() => handleClick("blue")}>
        blue
      </button>
    </>
  );
}
