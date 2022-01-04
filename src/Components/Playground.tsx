import React, { useState, useCallback } from 'react';
import { itemTypeArray } from '../util/item-types';

import classes from './Playground.module.scss';
import Button from './UI/Button';

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

  const activeItem = (key: string) => {
    return key === humanSelection ? classes.active : '';
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

  const animatedStyle = (animatedItem: string) => {
    const style = {
      height: '5rem',
    };
    const display = computerSelection === animatedItem ? 'block' : 'none';

    return { ...style, display };
  };

  return (
    <div className={classes.playground}>
      <div className={classes.items} style={{ gridColumn: '1 / -1', justifySelf: 'center' }}>
        {itemTypeArray.map((item) => (
          <img
            key={item.key}
            className={activeItem(item.key)}
            onClick={() => itemSelectHandler(item.key)}
            src={item.imgPath}
          />
        ))}
      </div>

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

      {/* placeholder image */}
      {!thinking && !computerSelection && (
        <img
          style={{ gridColumn: `3`, justifySelf: 'center', height: '5rem' }}
          src={process.env.PUBLIC_URL + '/question-mark.svg'}
        />
      )}

      {
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
      }
      {!thinking && winner && (
        <div
          style={{
            gridColumn: `1 / span 3`,
            justifySelf: 'center',
            textAlign: 'center',
            fontSize: '2rem',
            backgroundColor: 'darkred',
            borderRadius: '0.5rem',
            color: 'white',
            margin: '0 0.5rem',
            padding: '0 0.5rem',
            fontWeight: 'bold',
          }}
        >
          <span style={{}}>{winner}</span>
        </div>
      )}
      {thinking && (
        <div style={{ gridColumn: `1 / span 3`, justifySelf: 'center', fontSize: '2rem', textAlign: 'center' }}>
          Wait a moment please for the result...
        </div>
      )}
    </div>
  );
}
