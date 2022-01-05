import React from 'react';
import { itemTypeArray } from '../../util/item-types';

type Props = {
  computerSelection: string | null;
  gridCol: string;
};
export default function ComputerSelection({ gridCol, computerSelection }: Props) {
  const animatedStyle = (animatedItem: string) => {
    const style = {
      height: '5rem',
    };
    const display = computerSelection === animatedItem ? 'block' : 'none';

    return { ...style, display };
  };

  return (
    <div
      style={{
        gridColumn: gridCol,
        overflow: 'hidden',
        height: '5rem',
      }}
    >
      <div
        style={{
          justifySelf: 'center',
          display: 'flex',
          flexDirection: 'column',

          position: 'relative',
          transition: 'all 0.2s ease 0s',
        }}
      >
        {itemTypeArray.map((item) => (
          <img key={item.key} style={animatedStyle(item.key)} src={item.imgPath} />
        ))}
      </div>
    </div>
  );
}
