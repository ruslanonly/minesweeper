import React from 'react'

import styles from "./UI.module.scss"

type DigitProps = {
  value: number
}

export default function Digit(props: DigitProps) {
  let mlp
  if (props.value === 0) mlp = 9
  else mlp = props.value - 1
  const xPosititon = 14 * (mlp) + 11
  return (
    <div 
    style={{
      backgroundPositionX: `-${xPosititon}px`,
      backgroundPositionY: "-11px"
    }}
    className={styles.digit}></div>
  )
}
