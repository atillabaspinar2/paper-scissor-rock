import React, { useState, useCallback, useEffect } from 'react';
import { GameMode } from '../App';
import { findWinner, itemTypeArray } from '../util/item-types';
import PlaceholderImage from './PlaceholderImage';

import classes from './Playground.module.scss';
import Result from './Result';
import Button from './UI/Button';
import ComputerSelection from './UI/ComputerSelection';
import Overlay from './UI/Overlay';
import UserOptions from './UI/UserOptions';

export default function Playground({ gameMode }: { gameMode: GameMode }) {
  const [user1Selection, setUser1Selection] = useState<string | null>(null);
  const [user2Selection, setUser2Selection] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  // human user selects an item
  const itemSelectHandler = (item: string) => {
    setUser2Selection(null);
    setWinner(null);
    setUser1Selection(item);
  };

  const selectedImage = () => {
    return itemTypeArray.find((i) => i.key === user1Selection)?.imgPath;
  };

  // reset selected state when game mode changes
  useEffect(() => {
    setUser1Selection(null);
    setUser1Selection(null);
    setWinner(null);
  }, [gameMode]);

  // play is clicked
  const playHandler = useCallback(() => {
    setThinking(true);
    // animate computer thinking
    const interval = setInterval(() => {
      const computer2Random = Math.floor(Math.random() * 1000) % 3;
      const computer2Key = itemTypeArray[computer2Random].key;
      setUser2Selection((prevKey) => {
        if (prevKey === computer2Key) {
          // make sure to animate a different image each time. choose next item if same as prev
          return itemTypeArray[(computer2Random + 1) % itemTypeArray.length].key;
        }
        return computer2Key;
      });
      if (!isHuman()) {
        const computer1Random = Math.floor(Math.random() * 1000) % 3;
        const computer1Key = itemTypeArray[computer1Random].key;
        setUser1Selection((prevKey) => {
          if (prevKey === computer1Key) {
            // make sure to animate a different image each time
            return itemTypeArray[(computer1Random + 1) % itemTypeArray.length].key;
          }
          return computer1Key;
        });
      }
    }, 200);
    // keep last animated
    setTimeout(() => {
      const computer2Random = Math.floor(Math.random() * itemTypeArray.length);
      const computer2Key = itemTypeArray[computer2Random].key;
      setUser2Selection(() => computer2Key);

      let user1SelectedItem = user1Selection;
      if (!isHuman()) {
        const computer1Random = Math.floor(Math.random() * itemTypeArray.length);
        const computer1Key = itemTypeArray[computer1Random].key;
        user1SelectedItem = computer1Key; // if computer mode, then get latest value of selection
        setUser1Selection(() => computer1Key);
      }

      setWinner(() => findWinner(user1SelectedItem, computer2Key));

      setThinking(false);
      clearInterval(interval);
    }, 2000);
  }, [user1Selection, gameMode]);

  const buttonDisabled = () => {
    // if human user has not selected an option, disable
    // if computer thinking, disable
    return (isHuman() && user1Selection === null) || thinking;
  };

  const isHuman = () => {
    return gameMode === GameMode.COMPUTER_HUMAN;
  };

  return (
    <div className={classes.playground}>
      {isHuman() && <UserOptions humanSelection={user1Selection} itemSelectHandler={itemSelectHandler} />}

      <div style={{ gridColumn: `1`, justifySelf: 'center' }}>{isHuman() ? 'Human' : 'Computer'}</div>

      <div style={{ gridColumn: `3`, justifySelf: 'center' }}>Computer</div>

      {user1Selection && isHuman() && (
        <img style={{ gridColumn: `1`, justifySelf: 'center', height: '5rem' }} src={selectedImage()} />
      )}

      {!isHuman() && (thinking || user1Selection) && (
        <ComputerSelection gridCol="1" computerSelection={user1Selection} />
      )}

      {!user1Selection && <PlaceholderImage gridCol="1" />}

      <Button style={{ gridColumn: `2`, justifySelf: 'center' }} onClick={playHandler} disabled={buttonDisabled()}>
        PLAY
      </Button>

      {!thinking && !user2Selection && <PlaceholderImage gridCol="3" />}
      {thinking && <Overlay />}

      {(thinking || user2Selection) && <ComputerSelection gridCol="3" computerSelection={user2Selection} />}

      <Result thinking={thinking} winner={winner} />
    </div>
  );
}
