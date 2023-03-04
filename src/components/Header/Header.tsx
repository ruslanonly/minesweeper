import React, { useState } from 'react';

import cx from "classnames"

import Digit from '../UI/Digit';

import styles from "./Header.module.scss"
import Smile, { SmileType } from '../UI/Smile';

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
  smile: SmileType,
  numMines: number,
  elapsedTime: number,
  handleRestart: () => void,
  setSmileType: React.Dispatch<React.SetStateAction<SmileType>>
}

const Header = (props: HeaderProps) => {
  
  return (
    <div className={cx(styles.wrapper, "inner-wrapper")}>
      <Counter time={props.numMines}/>
      <button 
      className={styles.restart} 
      onMouseDown={() => props.setSmileType('smile-active')}
      onMouseUp={() => props.setSmileType('smile')}
      onClick={props.handleRestart}>
        <Smile type={props.smile}/>
      </button>
      <Counter time={props.elapsedTime}/>
    </div>
  );
};

export default Header;