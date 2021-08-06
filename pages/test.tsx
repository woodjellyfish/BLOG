import { useState } from "react";

export default function Test() {
  return (
    <div className="sticky">
      <div className="flex flex-row justify-start items-center w-full h-96 bg-gray-400">
        <div className="w-96 h-60 bg-red-200 flex-grow flex flex-row justify-center items-center">
          <div className="w-28 h-1/3 bg-red-600 flex-grow"></div>
        </div>

        <div className="w-96 h-60 bg-blue-100 flex-grow-0"></div>
      </div>
    </div>
  );
}
