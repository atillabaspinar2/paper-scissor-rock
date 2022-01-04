import React, { useState } from 'react';

import classes from './Playground.module.scss';
import Button from './UI/Button';

enum ItemTypes {
  'SCISSOR',
  'ROCK',
  'PAPER',
}
export default function Playground() {
  const [item, setItem] = useState<ItemTypes | null>(null);
  const [thinking, setThinking] = useState(false);
  const itemSelectHandler = (item: ItemTypes) => {
    console.log(item);

    setItem(item);
  };

  const activeItem = (i: ItemTypes) => {
    return i === item ? classes.active : '';
  };

  const selectedImage = () => {
    switch (item) {
      case ItemTypes.SCISSOR:
        return process.env.PUBLIC_URL + '/scissor.svg';
      case ItemTypes.ROCK:
        return process.env.PUBLIC_URL + '/rock.svg';
      case ItemTypes.PAPER:
        return process.env.PUBLIC_URL + '/paper.svg';
    }
  };

  const playHandler = () => {
    setThinking(true);
    setInterval(() => {
      setThinking(false);
    }, 2000);
  };

  return (
    <div className={classes.playground}>
      <div className={classes.items} style={{ gridColumn: '1 / -1', justifySelf: 'center' }}>
        <img
          className={activeItem(ItemTypes.SCISSOR)}
          onClick={() => itemSelectHandler(ItemTypes.SCISSOR)}
          src={process.env.PUBLIC_URL + '/scissor.svg'}
        />
        <img
          className={activeItem(ItemTypes.ROCK)}
          onClick={() => itemSelectHandler(ItemTypes.ROCK)}
          src={process.env.PUBLIC_URL + '/rock.svg'}
        />
        <img
          className={activeItem(ItemTypes.PAPER)}
          onClick={() => itemSelectHandler(ItemTypes.PAPER)}
          src={process.env.PUBLIC_URL + '/paper.svg'}
        />
      </div>

      {item && <img style={{ gridColumn: `1 / span 1`, justifySelf: 'center' }} src={selectedImage()} />}
      {!item && (
        <img
          style={{ gridColumn: `1 / span 1`, justifySelf: 'center' }}
          src={process.env.PUBLIC_URL + '/question-mark.svg'}
        />
      )}
      <Button style={{ gridColumn: `2`, justifySelf: 'center' }} onClick={playHandler} disabled={item === null}>
        Start playing
      </Button>
      {!thinking && (
        <img style={{ gridColumn: `3`, justifySelf: 'center' }} src={process.env.PUBLIC_URL + '/question-mark.svg'} />
      )}
    </div>
  );
}
