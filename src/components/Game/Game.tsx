import React, { useEffect, useRef, useState } from 'react';

import cx from "classnames"

import Board from '../Board/Board';
import Header from '../Header/Header';

import styles from "./Game.module.scss"
import { BASE_CONFIG, incElapsedTime, reset, SmileType } from '../../app/minesweeperSlice';
import { useAppDispatch } from '../../app/store';

const Game = () => {
  const dispatch = useAppDispatch()

  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  let intervalId = useRef<NodeJS.Timer>()
  
  useEffect(() => {
    if (gameStarted) {
      intervalId.current = setInterval(() => {
        dispatch(incElapsedTime())
      }, 1000);
    }
    if (gameOver) {
      clearInterval(intervalId.current)
    }
    return () => clearInterval(intervalId.current)
  }, [gameOver, gameStarted]);

  const handleStart = () => {
    setGameStarted(true)
  }

  const handleRestart = () => {
    setGameOver(false);
    setGameStarted(false)
    dispatch(reset())
  };

  const handleWin = () => {
    setGameOver(true);
  };

  const handleLose = () => {
    setGameOver(true);
  };

  return (  
    <div className={styles.game} onContextMenu={(e) => e.preventDefault()}>
      <div className={cx(styles.wrapper, "outer-wrapper")}>
        <Header
          handleRestart={handleRestart}
        />
        <Board
          size={BASE_CONFIG.boardSize}
          gameOver={gameOver}
          gameStarted={gameStarted}
          handleStart={handleStart}
          handleWin={handleWin}
          handleLose={handleLose}
        />
        </div>

    </div>
  );
};

export default Game;