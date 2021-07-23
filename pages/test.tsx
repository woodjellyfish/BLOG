import React, { useState } from "react";

export default function Test() {
  return (
    <>
      <div className="w-[50px] h-[50px] bg-gray-100 flex">
        <div className="w-full h-full bg-gradient-to-tl from-black rounded-full animate-spin ">
          <div className="h-[80%] w-[80%] rounded-full bg-center bg-gray-100 ml-[10%] mt-[10%]"></div>
        </div>
      </div>
    </>
  );
}
