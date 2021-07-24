import { itemType } from ".";

type Props = {
  item: itemType;
  isEdit: boolean;
};

const Menu = ({ item, isEdit }: Props) => {
  // if (item.nextId === -1 && item.sec < 0) return <div>end</div>;

  return (
    <div className="h-full flex justify-center items-center mt-3">
      <div className="rounded-md bg-white shadow-md h-48 w-48 flex flex-col">
        <p className="text-base text-gray-700 text-center font-bold bg-blue-400 rounded-t-md">
          {isEdit ? "editmode" : item.name}
        </p>
        <div className="bg-red-200 h-full flex items-center justify-center rounded-b-md">
          <p className="text-9xl text-gray-700 font-bold text-center ">
            {item.sec === -1 ? 0 : item.sec}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
