import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { Menu, List, MenuButton } from "../components/timer";

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

  const intervalId = useRef(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isItemEnd, setIsItemEnd] = useState(false);
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

  const getNextItem = (): itemType => {
    return items.find((elm) => elm.id === currentItem.nextId);
  };

  const editHandleClick = () => {
    setIsStarted(false);
    reset();
    clearInterval(intervalId.current);
    intervalId.current = 0;

    setIsEdit(!isEdit);
  };

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

  useEffect(() => {
    const json =
      localStorage.getItem("items") ?? JSON.stringify(getItemDefault());

    const newItems = JSON.parse(json);

    setItems(newItems);

    setCurrentItem({ ...newItems[0] });
  }, []);

  useEffect(() => {
    if (currentItem.sec < 0) {
      //preNext
      clearInterval(intervalId.current);
      const newItems = [...items];
      console.log("test");
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

  return (
    <Layout>
      <div className="bg-blue-100 w-full flex flex-col">
        <Menu item={currentItem} isEdit={isEdit} />
        <div className="mt-5 flex justify-center">
          <MenuButton
            isStarted={isStarted}
            isEdit={isEdit}
            items={items}
            editHandleClick={editHandleClick}
            reset={reset}
            setItems={setItems}
            switchTimer={switchTimer}
            getItemDefault={getItemDefault}
          />
        </div>
        <div className="mt-1 flex justify-center">
          <List
            isEdit={isEdit}
            items={items}
            curItemId={currentItem.id}
            setItems={setItems}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Timer;
