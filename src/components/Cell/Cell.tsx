import React from "react"

import CellView, { CellViewType } from '../UI/CellView';

import styles from "./Cell.module.scss"

export type CellAttributes = {
  x: number;
  y: number;
  isMine: boolean;
  isOpen: boolean;
  isFlagged: boolean;
  isQuestion: boolean;
  count: number;
}

type CellProps = CellAttributes & {
  onClick: (x: number, y: number) => void
  onRightClick: (x: number, y: number) => void
}

export default function Cell(props: CellProps) {
  const { isOpen, isMine, isFlagged, count, isQuestion } = props

  let cellType: CellViewType = "hidden"

  if (isOpen) {
    cellType = "open";
    if (isMine) {
      cellType = "mine"
    }
  } 
  else if (isQuestion) {
    cellType = "?"
  } else if (isFlagged) {
    cellType = "flagged";
  }

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const mouseButton = event.nativeEvent.which
    if (mouseButton === 1) props.onClick(props.x, props.y)
    else if (mouseButton === 3) props.onRightClick(props.x, props.y)
  }

  const children = () => {
    if (isOpen && !isMine && count > 0 && count < 9) return <CellView type={count}/>
    else return <CellView type={cellType}/>
  }

  return (
    <button onMouseDown={onClick} className={styles.block}>
      {children()}
    </button>
  )
}
