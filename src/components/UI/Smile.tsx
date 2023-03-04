import React from 'react'

import { SmileType } from '../../app/minesweeperSlice'

import styles from "./UI.module.scss"

type SmileProps = {
  type: SmileType
}

export default function Smile(props: SmileProps) {
  return (
    <div className={styles.smile} data-type={props.type}></div>
  )
}
