import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";

type itemType = {
  id: number;
  name: string;
  sec: number;
  isDone: boolean;
  nextId: number;
};

const Timer = () => {
  const [items, setItems] = useState<itemType[]>([]);

  const [currentItem, setCurrentItem] = useState<itemType>({
    id: -1,
    name: "interval",
    sec: 3,
    isDone: false,
    nextId: 0,
  });

  const [isStarted, setIsStarted] = useState(false);

  const intervalId = useRef(0);
  const [isItemEnd, setIsItemEnd] = useState(false);
  const [addItem, setAddItem] = useState({
    name: "",
    sec: 0,
  });
  const [isEdit, setIsEdit] = useState(false);

  const getFindIndex = (id: number) => {
    return items.findIndex((item) => item.id === id);
  };

  const countDown = () => {
    intervalId.current = window.setInterval(() => {
      setCurrentItem((preItem) => {
        return {
          ...preItem,
          sec: preItem.sec - 1,
        };
      });
    }, 1000);
  };

  const reset = () => {
    const newItems = items.map((item) => {
      item.isDone = false;
      return item;
    });
    setItems(newItems);
    setCurrentItem(items[0]);
  };

  const getNextItem = (): itemType => {
    return items.find((elm) => elm.id === currentItem.nextId);
  };

  useEffect(() => {
    const json =
      localStorage.getItem("items") ?? JSON.stringify(getItemDefault());

    const newItems = JSON.parse(json);

    setItems(newItems);

    setCurrentItem({ ...newItems[0] });
    setAddItem({ name: "", sec: 0 });
  }, []);

  useEffect(() => {
    if (currentItem.sec < 0) {
      //preNext
      clearInterval(intervalId.current);
      const newItems = [...items];
      console.log(`newItems:useeff`, newItems);

      newItems[getFindIndex(currentItem.id)].isDone = true;
      setItems(newItems);
      if (currentItem.nextId < 0) {
        //end
        setIsItemEnd(true);
        setIsStarted(false);
        clearInterval(intervalId.current);
        const newItems = [...items];
        setItems(newItems);
      } else {
        //next
        const nextItem = getNextItem();
        setCurrentItem(nextItem);

        countDown();
      }
    }
  }, [currentItem.sec]);

  const switchTimer = () => {
    if (isStarted) {
      //stop

      clearInterval(intervalId.current);
      intervalId.current = 0;

      setIsStarted(false);
    } else {
      if (isItemEnd) {
        const newItems = items.map((item) => {
          item.isDone = false;
          return item;
        });
        setIsItemEnd(false);
        setItems(newItems);
        setCurrentItem(newItems[0]);
      }
      //start

      setIsStarted(true);
      countDown();
    }
  };

  const currentItemDOM = () => {
    if (isItemEnd) return <div>end</div>;
    else {
      const item = { ...currentItem };
      if (item.sec < 0) item.sec = 0;
      return (
        <div>
          {item.name}:{item.sec}
        </div>
      );
    }
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

  const addItemNameHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddItem({ ...addItem, name: e.target.value });
  };

  const addItemSecHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddItem({ ...addItem, sec: parseInt(e.target.value) });
  };

  const editHandleClick = () => {
    setIsStarted(false);
    reset();
    clearInterval(intervalId.current);
    intervalId.current = 0;

    setIsEdit(!isEdit);
  };

  const itemsSave = () => {
    const newItems = items.map((item) => {
      item.isDone = false;
      return item;
    });
    const json = JSON.stringify(newItems);

    localStorage.setItem("items", json);

    alert("listを保存しました");
  };

  const getItemDefault = () => {
    return [
      {
        id: 0,
        name: "elbowPlank",
        sec: 60,
        isDone: false,
        nextId: 1,
      },
      {
        id: 1,
        name: "interval",
        sec: 10,
        isDone: false,
        nextId: 2,
      },
      {
        id: 2,
        name: "sidePlank",
        sec: 30,
        isDone: false,
        nextId: 3,
      },
      {
        id: 3,
        name: "interval",
        sec: 10,
        isDone: false,
        nextId: 4,
      },
      {
        id: 4,
        name: "sidePlank",
        sec: 30,
        isDone: false,
        nextId: -1,
      },
    ];
  };

  const addSave = () => {
    if (addItem.name === "" || addItem.sec <= 0) return;

    //新規IDの発行
    const lastId = items.find((item) => item.nextId === -1).id;
    const newItems = [...items];
    //todo items[last]のnextIdの変更
    newItems[lastId].nextId = lastId + 1;
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

    console.log(`newItems`, newItems);

    setItems(newItems);

    setCurrentItem(newItems[0]);
  };

  const editListDOM = () => {
    const retDom = items.map((item) => (
      <div key={item.id}>
        <input
          onChange={(e) => ItemNameHandleChange(e, item.id)}
          type="text"
          value={item.name}
        />
        <input
          onChange={(e) => ItemSecHandleChange(e, item.id)}
          type="number"
          value={item.sec}
          style={{ width: "3em" }}
        />
        <button onClick={() => deleteItem(item.id)}>del</button>
      </div>
    ));

    retDom.push(
      <div key={"addItem"}>
        <input
          placeholder="newItemName"
          type="text"
          value={addItem.name}
          onChange={(e) => addItemNameHandleChange(e)}
        />
        <input
          value={addItem.sec}
          type="number"
          style={{ width: "3em" }}
          onChange={(e) => addItemSecHandleChange(e)}
        />
        <button onClick={addSave}>add</button>
      </div>
    );

    return retDom;
  };

  const listDOM = () => {
    return items.map((item) => (
      <div key={item.id}>
        {item.isDone ? "●" : item.id === currentItem.id && ">"}
        {item.name}:{item.sec}
      </div>
    ));
  };

  return (
    <Layout>
      <h1>Timer</h1>
      今の項目
      {!isEdit ? currentItemDOM() : <div>editMode</div>}
      {!isEdit && (
        <button onClick={() => switchTimer()}>
          {!isStarted ? "start" : "stop"}
        </button>
      )}
      {isEdit && <button onClick={itemsSave}>save</button>}
      {isEdit && (
        <button onClick={() => setItems(getItemDefault())}>default</button>
      )}
      {!isEdit && <button onClick={reset}>reset</button>}
      <button onClick={editHandleClick}>edit</button>
      {isEdit ? editListDOM() : listDOM()}
    </Layout>
  );
};

export default Timer;
