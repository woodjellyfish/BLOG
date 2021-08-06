import React from "react";

type Props = {
  ids: string[];
};

export default function ElementIdLinks({ ids }: Props) {
  if (ids === null) return;

  const scrollId = (id: string) => {
    const top = document.getElementById(id).getBoundingClientRect().top;
    const headerHeight = document.getElementById("header").clientHeight;
    window.scroll({
      top: top + window.pageYOffset - headerHeight - 20,
      behavior: "auto",
    });
  };

  return (
    <div className="flex flex-col">
      <ul className="list-disc">
        <p className="bg-gray-400 rounded-lg shadow-md text-white px-4">目次</p>
        {ids.map((id) => (
          <div className="px-7 pt-2" key={id}>
            <li
              className="text-blue-900 hover:underline"
              onClick={() => scrollId(id)}
            >
              {id}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
