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
  numMines: number,
  elapsedTime: number,
  handleRestart: () => void
}

const Header = (props: HeaderProps) => {
  const [smile, setSmile] = useState<SmileType>('smile')

  
  return (
    <div className={cx(styles.wrapper, "inner-wrapper")}>
      <Counter time={props.numMines}/>
      <button 
      className={styles.restart} 
      onMouseDown={() => setSmile('smile-active')}
      onMouseUp={() => setSmile('smile')}
      onClick={props.handleRestart}>
        <Smile type={smile}/>
      </button>
      <Counter time={props.elapsedTime}/>
    </div>
  );
};

export default Header;