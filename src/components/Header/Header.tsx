import React, { useState } from 'react';

import cx from "classnames"

import Digit from '../UI/Digit';

import styles from "./Header.module.scss"
import Smile from '../UI/Smile';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setSmile, SmileType } from '../../app/minesweeperSlice';

type CounterProps = {
  time: number
}

const Counter = (props: CounterProps) => {
  let timeString = props.time.toString()
  timeString = '0'.repeat(3 - timeString.length) + timeString

  const values = timeString.split('').map((value) => parseInt(value))

  return (
    <div className={styles["counter-wrapper"]}>
      <Digit value={values[0]}/>
      <Digit value={values[1]}/>
      <Digit value={values[2]}/>
    </div>
  )
}

type HeaderProps = {
  handleRestart: () => void,
}

const Header = (props: HeaderProps) => {
  const dispatch = useAppDispatch()
  const minesweeper = useAppSelector(state => state.minesweeper)

  let smileType: SmileType = minesweeper.smile
  if (minesweeper.result === "win") smileType = "win"
  else if (minesweeper.result === "lose") smileType = "lose"

  return (
    <div className={cx(styles.wrapper, "inner-wrapper")}>
      <Counter time={minesweeper.mines}/>
      <button 
      className={styles.restart} 
      onMouseDown={() => dispatch(setSmile('smile-active'))}
      onMouseUp={() => dispatch(setSmile('smile'))}
      onClick={props.handleRestart}>
        <Smile type={smileType}/>
      </button>
      <Counter time={minesweeper.elapsedTime}/>
    </div>
  );
};

export default Header;