import { itemType } from ".";
import Button from "./Button";

type Props = {
  isStarted: boolean;
  isEdit: boolean;
  items: itemType[];
  editHandleClick;
  reset;
  setItems;
  switchTimer;
  getItemDefault;
};

const MenuButton = ({
  isStarted,
  isEdit,
  items,
  editHandleClick,
  reset,
  setItems,
  switchTimer,
  getItemDefault,
}: Props) => {
  const itemsSave = () => {
    const newItems = items.map((item) => {
      item.isDone = false;
      return item;
    });
    const json = JSON.stringify(newItems);

    localStorage.setItem("items", json);

    alert("listを保存しました");
  };

  if (isEdit) {
    return (
      <>
        <Button name="save" clickEv={itemsSave} />
        <Button name="default" clickEv={() => setItems(getItemDefault())} />
        <Button name="edit" clickEv={editHandleClick} />
      </>
    );
  } else {
    return (
      <>
        <Button name={isStarted ? "stop" : "start"} clickEv={switchTimer} />
        <Button name="reset" clickEv={reset} />
        <Button name="edit" clickEv={editHandleClick} />
      </>
    );
  }
};

export default MenuButton;
