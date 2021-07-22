import { ChangeEvent, useState } from "react";
import { itemType } from ".";

type Props = {
  isEdit: boolean;
  items: itemType[];
  curItemId: number;
  setItems: any;
};

const List = ({ isEdit, items, curItemId, setItems }: Props) => {
  const [addItem, setAddItem] = useState({
    name: "",
    sec: 1,
  });

  const getFindIndex = (id: number) => {
    return items.findIndex((item) => item.id === id);
  };

  const addItemNameHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddItem({ ...addItem, name: e.target.value });
  };

  const addItemSecHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddItem({ ...addItem, sec: parseInt(e.target.value) });
  };

  const addSave = () => {
    if (addItem.name === "" || addItem.sec <= 0) return;

    //新規IDの発行
    //リストの最後(nextId==-1)のidを取得
    const lastId = items.find((item) => item.nextId === -1).id;

    console.log(`lastId`, lastId);
    const newItems = [...items];
    //todo items[last]のnextIdの変更
    console.log(`newItems`, newItems);
    newItems[getFindIndex(lastId)].nextId = lastId + 1;
    //todo items[]への追加
    const newItem: itemType = {
      id: lastId + 1,
      name: addItem.name,
      sec: addItem.sec,
      isDone: false,
      nextId: -1,
    };

    newItems.push(newItem);

    setItems(newItems);
    setAddItem({ name: "", sec: 0 });
  };

  const deleteItem = (id: number) => {
    if (items.length === 1) return;

    const firstId = items[0].id;

    const preItem = items.find((item) => item.nextId === id);

    const newItems = items.filter((item) => item.id !== id);

    //リスト最初のアイテム以外ならnextIdを変更する
    if (firstId !== id) {
      const preItemIndex = newItems.findIndex((item) => item.id === preItem.id);
      const selectItemIndex = getFindIndex(id);

      newItems[preItemIndex].nextId = items[selectItemIndex].nextId;
    }

    setItems(newItems);
  };

  const ItemSecHandleChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newItems = [...items];

    newItems[getFindIndex(id)].sec = parseInt(e.target.value);
    setItems(newItems);
  };

  const ItemNameHandleChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newItems = [...items];

    newItems[getFindIndex(id)].name = e.target.value;
    setItems(newItems);
  };

  if (isEdit) {
    return (
      <>
        {items.map((item) => (
          <div key={item.id}>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                ItemNameHandleChange(e, item.id)
              }
              type="text"
              value={item.name}
            />
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                ItemSecHandleChange(e, item.id)
              }
              type="number"
              value={item.sec}
              style={{ width: "3em", textAlign: "right" }}
            />
            <button onClick={() => deleteItem(item.id)}>del</button>
          </div>
        ))}
        <div></div>
        <input
          placeholder="newItemName"
          type="text"
          value={addItem.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            addItemNameHandleChange(e)
          }
        />
        <input
          placeholder="sec"
          type="number"
          style={{ width: "3em" }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            addItemSecHandleChange(e)
          }
        />
        <button onClick={addSave}>add</button>
      </>
    );
  } else {
    return (
      <>
        {items.map((item) => (
          <div key={item.id}>
            {item.isDone ? "●" : item.id === curItemId && ">"}
            {item.name}:{item.sec}
          </div>
        ))}
      </>
    );
  }
};

export default List;
