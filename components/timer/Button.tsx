import { MouseEventHandler } from "react";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

type Props = {
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const setButtonColor = (color: string) => {
  switch (color) {
    case "red":
      return "mb-3 mx-1 rounded-full items-center shadow-lg bg-red-500 px-4 py-2 text-gray-100 font-bold text-xl md:hover:bg-red-400 select-none";
    case "blue":
      return " mb-3 mx-1 rounded-full items-center shadow-lg bg-blue-500 px-4 py-2 text-gray-100 font-bold text-xl md:hover:bg-blue-400 select-none";
    default:
      return "mb-3 mx-1 rounded-full items-center shadow-lg bg-green-500 px-4 py-2 text-gray-100 font-bold text-xl md:hover:bg-green-400 select-none";
  }
};

const Button = ({ name, onClick }: Props) => {
  const color = name === "stop" ? "red" : "blue";
  return (
    <button className={setButtonColor(color)} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
