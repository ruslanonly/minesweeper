import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import cx from "classnames"

import Board from '../Board/Board';
import Header from '../Header/Header';

import styles from "./Game.module.scss"
import { incElapsedTime, reset, setGameOver, setMines, setResult, setSmile, SmileType } from '../../app/minesweeperSlice';
import { useAppDispatch } from '../../app/store';

export type GameConfig = {
  boardSize: number
  numMines: number
}

const Game = (props: GameConfig) => {
  const dispatch = useAppDispatch()

  const [firstMove, setFirstMove] = useState(true);

  useLayoutEffect(() => {
    dispatch(setMines(props.numMines))
  }, [])

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
    dispatch(setMines(props.numMines))
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
          size={props.boardSize}
          numMines={props.numMines}
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