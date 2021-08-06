import React from "react";

export default function SideMenu({ children }) {
  return (
    <div className="hidden md:flex top-11 h-full flex-shrink-0 md:sticky">
      <div className=" bg-white mx-3 p-3 w-80 flex-shrink-0 rounded-lg">
        {children}
      </div>
    </div>
  );
}
