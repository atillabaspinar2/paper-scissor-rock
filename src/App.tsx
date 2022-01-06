import React, { useState } from 'react';
import classes from './App.module.scss';
import GameOptions from './Components/GameOptions';
import Header from './Components/Header';
import Playground from './Components/Playground';

export enum GameMode {
  'COMPUTER_HUMAN' = 'COMPUTER_HUMAN',
  'COMPUTER_COMPUTER' = 'COMPUTER_COMPUTER',
}

function App() {
  const [gameOption, setGameOption] = useState(GameMode.COMPUTER_HUMAN);
  const gameModeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const x = event.target.value as GameMode;
    setGameOption(x);
  };

  return (
    <div>
      <Header></Header>
      <main className={classes.main}>
        <GameOptions gameOption={gameOption} onGameModeChange={gameModeChangeHandler}></GameOptions>
        <Playground gameMode={gameOption}></Playground>
      </main>
    </div>
  );
}

export default App;
