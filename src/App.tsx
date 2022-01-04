import React from 'react';
import classes from './App.module.scss';
import GameOptions from './Components/GameOptions';
import Header from './Components/Heaader';

function App() {
  return (
    <div>
      <Header></Header>
      <main className={classes.main}>
        <GameOptions></GameOptions>
      </main>
    </div>
  );
}

export default App;
