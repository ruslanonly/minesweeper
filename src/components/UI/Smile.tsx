import React from 'react'

import styles from "./UI.module.scss"

export type SmileType = "smile" | "smile-active" | "scared" | "win" | "lose"

type SmileProps = {
  type: SmileType
}

export default function Smile(props: SmileProps) {
  return (
    <div className={styles.smile} data-type={props.type}></div>
  )
}
