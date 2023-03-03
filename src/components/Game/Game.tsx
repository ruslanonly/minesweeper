import React, { useState } from 'react';

import cx from "classnames"

import Board from '../Board/Board';
import Header from '../Header/Header';

import styles from "./Game.module.scss"

type GameConfig = {
  boardSize: number,
  numMines: number
}

const BASE_CONFIG: GameConfig = {
  boardSize: 16,
  numMines: 40
}

const Game = () => {
  const [boardSize, setBoardSize] = useState(BASE_CONFIG.boardSize);
  const [numMines, setNumMines] = useState(BASE_CONFIG.numMines);
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
      <div className={cx(styles.wrapper, "outer-wrapper")}>
        <Header
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
        </div>

    </div>
  );
};

export default Game;