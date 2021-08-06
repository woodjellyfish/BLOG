import React from "react";

export default function SideMenu({ children }) {
  return (
    <div className="hidden md:block flex-auto top-11 h-full sticky">
      <div className="bg-white mx-3 p-3 w-80 rounded-lg">{children}</div>
    </div>
  );
}
