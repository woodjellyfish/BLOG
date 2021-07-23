import { MouseEventHandler } from "react";

type Props = {
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const setButtonColor = (color: string) => {
  switch (color) {
    case "red":
      return "mb-3 mx-1 rounded-full items-center shadow bg-red-500 px-4 py-2 text-gray-100 font-bold text-xl hover:bg-red-400";
    case "blue":
      return "mb-3 mx-1 rounded-full items-center shadow bg-blue-500 px-4 py-2 text-gray-100 font-bold text-xl hover:bg-blue-400";
    default:
      return "mb-3 mx-1 rounded-full items-center shadow bg-green-500 px-4 py-2 text-gray-100 font-bold text-xl hover:bg-green-400";
  }
};

const Button = ({ name, onClick }: Props) => {
  return (
    <button className={setButtonColor("blue")} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
