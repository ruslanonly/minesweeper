import React from 'react';
import Digit from '../UI/Digit';

import styles from "./Counter.module.scss"

type ElapsedTimeProps = {
  time: number
}

const ElapsedTime = (props: ElapsedTimeProps) => {
  const values = props.time.toString().split('').map((value) => parseInt(value))
  return (
    <div className={styles["elapsed-time"]}>
      <Digit value={values[0]}/>
      <Digit value={values[1]}/>
      <Digit value={values[2]}/>
    </div>
  )
}

type CounterProps = {
  numMines: number,
  elapsedTime: number,
  handleRestart: () => void
}

const Counter = (props: CounterProps) => {
  return (
    <div className={styles.wrapper}>
      <div className="mine-count">{props.numMines}</div>
      <button className="restart-button" onClick={props.handleRestart}>
        
      </button>
      <ElapsedTime time={props.elapsedTime}/>
    </div>
  );
};

export default Counter;