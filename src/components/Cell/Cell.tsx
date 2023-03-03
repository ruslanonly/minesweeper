import React from "react"

import CellView, { CellViewType } from '../UI/CellView';

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
  const cellType: CellViewType = "hidden"

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const mouseButton = event.nativeEvent.which
    if (mouseButton === 1) props.onClick(props.x, props.y)
    else if (mouseButton === 3) props.onRightClick(props.x, props.y)
  }

  return (
    <button onMouseDown={onClick} className={styles.block}>
      <CellView type={cellType}/>
    </button>
  )
}
