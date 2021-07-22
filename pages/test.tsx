import React, { useState } from "react";

export default function Test() {
  return (
    <>
      <div className="flex container max-w-full">
        <div className="container bg-red-200">hoge</div>
        <div className="container  bg-red-400">piyo</div>
      </div>
      <div>bar</div>
      <button className="w-20 bg-blue-400"> click me</button>
    </>
  );
}
