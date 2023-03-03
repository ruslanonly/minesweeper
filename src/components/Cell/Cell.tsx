import React from 'react'
import Digit from '../UI/Digit';

import styles from "./Cell.module.scss"

export type CellAttributes = {
  x: number;
  y: number;
  isMine: boolean;
  isOpen: boolean;
  isFlagged: boolean;
  count: number;
}

type CellProps = CellAttributes & {
  onClick: (x: number, y: number) => void
  onRightClick: (x: number, y: number) => void
}

export default function Cell(props: CellProps) {
  return (
    <div className={styles.block}>
      {/* <Digit value={props.count}/> */}
    </div>
  )
}
