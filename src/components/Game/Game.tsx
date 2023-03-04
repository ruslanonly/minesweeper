import React, { useEffect, useRef, useState } from 'react';

import cx from "classnames"

import Board from '../Board/Board';
import Header from '../Header/Header';

import styles from "./Game.module.scss"
import { BASE_CONFIG, incElapsedTime, reset, setGameOver, setResult, setSmile, SmileType } from '../../app/minesweeperSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';

const Game = () => {
  const dispatch = useAppDispatch()
  const minesweeper = useAppSelector(state => state.minesweeper)

  const [firstMove, setFirstMove] = useState(false);

  let intervalId = useRef<NodeJS.Timer>()
  
  useEffect(() => {
    if (firstMove) {
      intervalId.current = setInterval(() => {
        dispatch(incElapsedTime())
      }, 1000);
    }
    if (minesweeper.gameOver) {
      clearInterval(intervalId.current)
    }
    return () => clearInterval(intervalId.current)
  }, [minesweeper.gameOver, firstMove]);

  const handleStart = () => {
    setFirstMove(true)
  }

  const handleRestart = () => {
    dispatch(setGameOver(false))
    setFirstMove(false)
    dispatch(reset())
  };

  const handleWin = () => {
    dispatch(setGameOver(true))
    dispatch(setResult("win"))
  };

  const handleLose = () => {
    dispatch(setGameOver(true))
    dispatch(setResult("lose"))
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