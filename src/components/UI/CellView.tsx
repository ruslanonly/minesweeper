import React from 'react'

import styles from "./UI.module.scss"

export type CellViewType = "hidden" | "open" | "flag" | "?" | "open?" | "bomb" | "bomb-red" | "bomb-crossed" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 

type CellViewProps = {
  type: CellViewType
}

export default function CellView(props: CellViewProps) {
  return (
    <div className={styles.cellView} data-type={props.type}></div>
  )
}
