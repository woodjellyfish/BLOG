import { MouseEventHandler } from "react";

type Props = {
  name: string;
  clickEv: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ name, clickEv }: Props) => {
  return (
    <>
      <button onClick={clickEv}>{name}</button>
    </>
  );
};

export default Button;
