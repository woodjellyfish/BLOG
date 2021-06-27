import { itemType } from ".";

type Props = {
  item: itemType;
  isEdit: boolean;
};

const Menu = ({ item, isEdit }: Props) => {
  if (item.nextId === -1 && item.sec < 0) return <div>end</div>;

  if (isEdit) return <div>edit mode</div>;

  return (
    <div>
      {item.name}:{item.sec > 0 ? item.sec : 0}
    </div>
  );
};

export default Menu;
