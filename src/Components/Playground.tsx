import React, { useState, useCallback } from 'react';
import { findWinner, itemTypeArray } from '../util/item-types';
import PlaceholderImage from './PlaceholderImage';

import classes from './Playground.module.scss';
import Result from './Result';
import Button from './UI/Button';
import ComputerSelection from './UI/ComputerSelection';
import Overlay from './UI/Overlay';
import UserOptions from './UI/UserOptions';

export default function Playground() {
  const [humanSelection, setHumanSelection] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const [computerSelection, setComputerSelection] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const itemSelectHandler = (item: string) => {
    console.log(item);
    setComputerSelection(null);
    setWinner(null);
    setHumanSelection(item);
  };

  const selectedImage = () => {
    return itemTypeArray.find((i) => i.key === humanSelection)?.imgPath;
  };

  const playHandler = useCallback(() => {
    setThinking(true);
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * 1000) % 3;
      const key = itemTypeArray[random].key;
      setComputerSelection((prevKey) => {
        if (prevKey === key) {
          // make sure to animate a different image each time
          return itemTypeArray[(random + 1) % itemTypeArray.length].key;
        }
        return key;
      });
    }, 200);
    setTimeout(() => {
      const random = Math.floor(Math.random() * itemTypeArray.length);
      const key = itemTypeArray[random].key;
      setComputerSelection(() => key);
      setWinner(() => findWinner(humanSelection, key));

      setThinking(false);
      clearInterval(interval);
    }, 2000);
  }, [humanSelection]);

  return (
    <div className={classes.playground}>
      <UserOptions humanSelection={humanSelection} itemSelectHandler={itemSelectHandler} />

      <div style={{ gridColumn: `1 / span 1`, justifySelf: 'center' }}>Human</div>
      <div style={{ gridColumn: `3 / span 1`, justifySelf: 'center' }}>Computer</div>
      {humanSelection && (
        <img style={{ gridColumn: `1 / span 1`, justifySelf: 'center', height: '5rem' }} src={selectedImage()} />
      )}
      {!humanSelection && <PlaceholderImage gridCol="1" />}

      <Button
        style={{ gridColumn: `2`, justifySelf: 'center' }}
        onClick={playHandler}
        disabled={humanSelection === null || thinking}
      >
        PLAY
      </Button>

      {!thinking && !computerSelection && <PlaceholderImage gridCol="3" />}
      {thinking && <Overlay />}

      <ComputerSelection computerSelection={computerSelection} />

      <Result thinking={thinking} winner={winner} />
    </div>
  );
}
