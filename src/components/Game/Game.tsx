import React, { useState } from 'react';
import Board from '../Board/Board';
import Counter from './Counter';
import Dialog from './Dialog';

import styles from "Game.module.scss"

const Game = () => {
  const [boardSize, setBoardSize] = useState(10);
  const [numMines, setNumMines] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleRestart = () => {
    setGameOver(false);
    setElapsedTime(0);
  };

  const handleWin = () => {
    setGameOver(true);
  };

  const handleLose = () => {
    setGameOver(true);
  };

  return (
    <div className={styles.game}>
      <h1>Minesweeper</h1>
      <Counter
        numMines={numMines}
        elapsedTime={elapsedTime}
        handleRestart={handleRestart}
      />
      <Board
        size={boardSize}
        numMines={numMines}
        gameOver={gameOver}
        handleWin={handleWin}
        handleLose={handleLose}
        setElapsedTime={setElapsedTime}
      />
      {gameOver && <Dialog handleRestart={handleRestart} />}
    </div>
  );
};

export default Game;