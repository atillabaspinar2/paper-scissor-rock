import React, { useState } from 'react';

enum GameOption {
  'COMPUTER_HUMAN' = 'COMPUTER_HUMAN',
  'COMPUTER_COMPUTER' = 'COMPUTER_COMPUTER',
}

export default function GameOptions() {
  const [gameOption, setGameOption] = useState(GameOption.COMPUTER_HUMAN);
  const gameOptionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const x = event.target.value as GameOption;
    console.log(x);
    setGameOption(x);
  };

  return (
    <div>
      <p>Select who is playing:</p>
      <div>
        <input
          type="radio"
          id="ch"
          name="game-option"
          value={GameOption.COMPUTER_HUMAN}
          checked={gameOption === GameOption.COMPUTER_HUMAN}
          onChange={gameOptionChangeHandler}
        />
        <label htmlFor="ch">Computer vs Human</label>
      </div>

      <div>
        <input
          type="radio"
          id="cc"
          name="game-option"
          value={GameOption.COMPUTER_COMPUTER}
          checked={gameOption === GameOption.COMPUTER_COMPUTER}
          onChange={gameOptionChangeHandler}
        />
        <label htmlFor="cc">Computer vs Computer</label>
      </div>
    </div>
  );
}
