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

    const newItems = [...items];
    //todo items[last]のnextIdの変更
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
        <div className="flex flex-col bg-white rounded-md p-3 mb-5">
          {items.map((item) => (
            <div className="mb-1" key={item.id}>
              <input
                className="text-xl border-b mb-1 border-gray-500 mr-3"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  ItemNameHandleChange(e, item.id)
                }
                type="text"
                value={item.name}
              />
              <input
                className="text-xl border-b mb-1 border-gray-500 mr-3"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  ItemSecHandleChange(e, item.id)
                }
                type="number"
                value={item.sec}
                style={{ width: "3em", textAlign: "right" }}
              />
              <button
                className="shadow px-2 rounded-md bg-red-500  text-white hover:bg-red-400"
                onClick={() => deleteItem(item.id)}
              >
                del
              </button>
            </div>
          ))}
          <div></div>
          <div className="flex flex-row">
            <input
              className="text-xl border-b mb-1 border-gray-500 mr-3"
              placeholder="newItemName"
              type="text"
              value={addItem.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                addItemNameHandleChange(e)
              }
            />
            <input
              className="text-xl border-b mb-1 border-gray-500 mr-3"
              placeholder="sec"
              type="number"
              style={{ width: "3em" }}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                addItemSecHandleChange(e)
              }
            />
            <button
              className="shadow px-2 rounded-md bg-blue-500  text-white hover:bg-blue-400"
              onClick={addSave}
            >
              add
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col bg-white rounded-t-md p-3 mb-5">
          {items.map((item) => (
            <div className="flex" key={item.id}>
              <a className="font-bold text-xl">
                {item.isDone ? "●" : item.id === curItemId && ">"}
              </a>
              <a className="text-xl border-b mb-1 border-gray-500 mr-3">
                {item.name}
              </a>
              <a className="text-xl ml-auto border-b mb-1 ">{item.sec}</a>
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default List;
