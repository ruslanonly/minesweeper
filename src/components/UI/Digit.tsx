import React from 'react'

import styles from "./UI.module.scss"

type DigitProps = {
  value: number
}

export default function Digit(props: DigitProps) {
  const xPosititon = 14 * props.value + 11
  return (
    <div 
    style={{
      backgroundPositionX: `-${xPosititon}px`,
      backgroundPositionY: "-11px"
    }}
    className={styles.digit}></div>
  )
}
