import { MouseEventHandler } from "react";
import { Button as MtButton } from "@material-ui/core";

type Props = {
  name: string;
  clickEv: MouseEventHandler<HTMLButtonElement>;
};

declare namespace JSX {
  interface IntrinsicElements {
    mtButton: Props;
  }
}

const Button = ({ name, clickEv }: Props) => {
  return (
    <>
      <MtButton variant="contained" color="primary" onClick={clickEv}>
        {name}
      </MtButton>
    </>
  );
};

export default Button;
