import React, { useEffect, useRef, useState } from 'react';

import cx from "classnames"

import Board from '../Board/Board';
import Header from '../Header/Header';

import styles from "./Game.module.scss"
import { BASE_CONFIG, incElapsedTime, reset, setGameOver, setResult, setSmile, SmileType } from '../../app/minesweeperSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';

const Game = () => {
  const dispatch = useAppDispatch()

  const [firstMove, setFirstMove] = useState(true);

  let intervalId = useRef<NodeJS.Timer>()

  const handleStart = () => {
    setFirstMove(false)
    intervalId.current = setInterval(() => {
      dispatch(incElapsedTime())
    }, 1000);
  }

  const handleRestart = () => {
    dispatch(setGameOver(false))
    setFirstMove(true)
    dispatch(reset())
    clearInterval(intervalId.current)
  };

  const handleWin = () => {
    dispatch(setGameOver(true))
    dispatch(setResult("win"))
    clearInterval(intervalId.current)
  };

  const handleLose = () => {
    dispatch(setGameOver(true))
    dispatch(setResult("lose"))
    clearInterval(intervalId.current)
  };

  return (  
    <div className={styles.game} onContextMenu={(e) => e.preventDefault()}>
      <div className={cx(styles.wrapper, "outer-wrapper")}>
        <Header
          handleRestart={handleRestart}
        />
        <Board
          size={BASE_CONFIG.boardSize}
          firstMove={firstMove}
          handleStart={handleStart}
          handleWin={handleWin}
          handleLose={handleLose}
        />
        </div>

    </div>
  );
};

export default Game;