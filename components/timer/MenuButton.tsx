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
        <div className="flex-row items-center ">
          <Button name="save" onClick={itemsSave} />
          <Button name="default" onClick={() => setItems(getItemDefault())} />
          <Button name="edit" onClick={editHandleClick} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex-row ">
          <Button name={isStarted ? "stop" : "start"} onClick={switchTimer} />
          <Button name="reset" onClick={reset} />
          <Button name="edit" onClick={editHandleClick} />
        </div>
      </>
    );
  }
};

export default MenuButton;
