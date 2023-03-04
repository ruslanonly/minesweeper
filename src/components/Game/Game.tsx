import React, { useEffect, useRef, useState } from 'react';

import cx from "classnames"

import Board from '../Board/Board';
import Header from '../Header/Header';

import styles from "./Game.module.scss"
import { SmileType } from '../UI/Smile';

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
  const [gameStarted, setGameStarted] = useState(false);

  const [smile, setSmile] = useState<SmileType>('smile')

  let intervalId = useRef<NodeJS.Timer>()
  
  useEffect(() => {
    if (gameStarted) {
      intervalId.current = setInterval(() => {
        setElapsedTime(elapsedTime => elapsedTime + 1);
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
    setElapsedTime(0);
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
          numMines={numMines}
          elapsedTime={elapsedTime}
          handleRestart={handleRestart}
          setSmileType={setSmile}
          smile={smile}
        />
        <Board
          size={boardSize}
          numMines={numMines}
          gameOver={gameOver}
          gameStarted={gameStarted}
          handleStart={handleStart}
          handleWin={handleWin}
          handleLose={handleLose}
          setElapsedTime={setElapsedTime}
          setNumMines={setNumMines}
          setSmileType={setSmile}
        />
        </div>

    </div>
  );
};

export default Game;