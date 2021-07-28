import { MouseEventHandler } from "react";
import styles from "./Button.module.scss";

type Props = {
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ name, onClick }: Props) => {
  const color = name === "stop" ? styles.btnStop : styles.btnPrimary;
  return (
    <button className={color} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
