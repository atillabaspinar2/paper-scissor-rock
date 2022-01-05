import React from 'react';
import { GameMode } from '../App';

type Props = {
  gameOption: GameMode;
  onGameModeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function GameOptions(props: Props) {
  return (
    <div style={{ margin: 'auto' }}>
      <p>Select who is playing:</p>
      <div>
        <input
          type="radio"
          id="ch"
          name="game-option"
          value={GameMode.COMPUTER_HUMAN}
          checked={props.gameOption === GameMode.COMPUTER_HUMAN}
          onChange={props.onGameModeChange}
        />
        <label htmlFor="ch">Computer vs Human</label>
      </div>

      <div>
        <input
          type="radio"
          id="cc"
          name="game-option"
          value={GameMode.COMPUTER_COMPUTER}
          checked={props.gameOption === GameMode.COMPUTER_COMPUTER}
          onChange={props.onGameModeChange}
        />
        <label htmlFor="cc">Computer vs Computer</label>
      </div>
    </div>
  );
}
