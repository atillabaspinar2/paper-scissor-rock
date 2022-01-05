import React from 'react';
import { itemTypeArray } from '../../util/item-types';

type Props = {
  computerSelection: string | null;
};
export default function ComputerSelection({ computerSelection }: Props) {
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
        gridColumn: `3`,
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
