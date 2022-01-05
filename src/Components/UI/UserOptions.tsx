import React from 'react';
import { itemTypeArray } from '../../util/item-types';
import classes from './UserOptions.module.scss';
type Props = {
  humanSelection: string | null;
  itemSelectHandler: (key: string) => void;
};
export default function UserOptions(props: Props) {
  const activeItem = (key: string) => {
    return key === props.humanSelection ? classes.active : '';
  };

  return (
    <div className={classes.items}>
      {itemTypeArray.map((item) => (
        <img
          key={item.key}
          className={activeItem(item.key)}
          onClick={() => props.itemSelectHandler(item.key)}
          src={item.imgPath}
        />
      ))}
    </div>
  );
}
