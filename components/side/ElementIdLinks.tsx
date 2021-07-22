import React from "react";

type Props = {
  ids: string[];
};

const scrollId = (id: string) => {
  const top = document.getElementById(id).getBoundingClientRect().top;
  const headerHeight = document.getElementById("header").clientHeight;
  window.scroll({
    top: top + window.pageYOffset - headerHeight - 20,
    behavior: "smooth",
  });
};

export default function ElementIdLinks({ ids }: Props) {
  if (ids === null) return;
  return (
    <div>
      <ul>
        {ids.map((id, index) => (
          <li
            className="hover:bg-yellow-200"
            onClick={() => scrollId(id)}
            key={index}
          >
            {id}
          </li>
        ))}
      </ul>
    </div>
  );
}
