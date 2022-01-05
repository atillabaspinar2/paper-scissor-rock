import React, { useState, useCallback } from 'react';
import { itemTypeArray } from '../util/item-types';
import PlaceholderImage from './PlaceholderImage';

import classes from './Playground.module.scss';
import Result from './Result';
import Button from './UI/Button';
import ComputerSelection from './UI/ComputerSelection';
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
      const r = Math.floor(Math.random() * 1000) % 3;
      const key = itemTypeArray[r].key;
      setComputerSelection(key);
    }, 200);
    setTimeout(() => {
      const r = Math.floor(Math.random() * itemTypeArray.length);

      console.log('selected is', r);
      const key = itemTypeArray[r].key;
      setComputerSelection(() => {
        return key;
      });
      setWinner(() => {
        const i1 = itemTypeArray.findIndex((i) => i.key === humanSelection);
        const i2 = itemTypeArray.findIndex((i) => i.key === key);
        if (i1 === i2) {
          return 'Tie';
        }
        const [min, max] = i1 <= i2 ? [i1, i2] : [i2, i1];
        let winnerKey = '';
        let loserKey = '';
        if (max - min < itemTypeArray.length / 2) {
          winnerKey = itemTypeArray[min].key;
          loserKey = itemTypeArray[max].key;
        } else {
          winnerKey = itemTypeArray[max].key;
          loserKey = itemTypeArray[min].key;
        }
        const text = winnerKey === humanSelection ? 'Human wins' : 'Computer wins';
        return `${text} with ${winnerKey} against ${loserKey}`;
      });

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
      {!humanSelection && (
        <img
          style={{ gridColumn: `1 / span 1`, justifySelf: 'center', height: '5rem' }}
          src={process.env.PUBLIC_URL + '/question-mark.svg'}
        />
      )}

      <Button
        style={{ gridColumn: `2`, justifySelf: 'center' }}
        onClick={playHandler}
        disabled={humanSelection === null || thinking}
      >
        PLAY
      </Button>

      {!thinking && !computerSelection && <PlaceholderImage />}

      <ComputerSelection computerSelection={computerSelection} />

      <Result thinking={thinking} winner={winner} />
    </div>
  );
}
