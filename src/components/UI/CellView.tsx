import React from 'react'

import styles from "./UI.module.scss"

export type CellViewType = "hidden" | "open" | "flagged" | "?" | "open?" | "mine" | "mine-red" | "mine-crossed" | number

type CellViewProps = {
  type: CellViewType
}

export default function CellView(props: CellViewProps) {
  return (
    <div className={styles.cellView} data-type={props.type}></div>
  )
}
