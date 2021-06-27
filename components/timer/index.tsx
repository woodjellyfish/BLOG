import Menu from "./Menu";
import Button from "./Button";
import List from "./List";
import MenuButton from "./MenuButton";

export type itemType = {
  id: number;
  name: string;
  sec: number;
  isDone: boolean;
  nextId: number;
};

export { Menu, Button, List, MenuButton };
