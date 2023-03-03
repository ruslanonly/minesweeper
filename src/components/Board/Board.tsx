import { useEffect, useState } from "react";
import cx from "classnames";

import Cell, { CellAttributes } from "../Cell/Cell";

import styles from "./Board.module.scss"

type BoardProps = {
  size: number,
  numMines: number,
  gameOver: boolean,
  handleWin: () => void,
  handleLose: () => void,
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>
}

const createBoard = (size: number, numMines: number) => {
  let board: CellAttributes[][] = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      const cell: CellAttributes = {
        x: j,
        y: i,
        isMine: false,
        isOpen: false,
        isFlagged: false,
        count: 0,
      }
      row.push(cell);
    }
    board.push(row);
  }
  for (let i = 0; i < numMines; i++) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    while (board[y][x].isMine) {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
    }
    board[y][x].isMine = true;
    for (let j = Math.max(0, y - 1); j <= Math.min(size - 1, y + 1); j++) {
      for (let k = Math.max(0, x - 1); k <= Math.min(size - 1, x + 1); k++) {
        if (!board[j][k].isMine) {
          board[j][k].count++;
        }
      }
    }
    return board;
  }
  return board
}

const Board = (props: BoardProps) => {
  const { size, numMines, gameOver, handleLose, handleWin, setElapsedTime} = props

  const [board, setBoard] = useState<CellAttributes[][]>([]);
  const [mines, setMines] = useState(numMines);
  const [flags, setFlags] = useState(0);

  useEffect(() => {
    const newBoard = createBoard(size, numMines);
    setBoard(newBoard);
  }, [size, numMines]);

  useEffect(() => {
    if (!gameOver) {
      const intervalId = setInterval(() => {
        setElapsedTime(elapsedTime => elapsedTime + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [gameOver]);

  const handleCellClick = (x: number, y: number) => {
    if (gameOver) {
      return;
    }
    const cell = board[y][x];
    if (cell.isFlagged || cell.isOpen) {
      return;
    }

    if (cell.isMine) {
      handleLose();
      return;
    }
    // openCell(cell);
  };
    
  const handleCellRightClick = (x: number, y: number) => {
    if (gameOver) {
      return;
    }
    const cell = board[y][x];
    if (cell.isOpen) {
      return;
    }
    if (cell.isFlagged) {
      setFlags(flags - 1);
      setMines(mines + 1);
      board[y][x].isFlagged = false;
    } else {
      setFlags(flags + 1);
      setMines(mines - 1);
      board[y][x].isFlagged = true;
    }
  };

  const renderCells = () => {
    const rows: JSX.Element[] = [];
    for (let i = 0; i < size; i++) {
      const rowCells: JSX.Element[] = []
      for (let j = 0; j < size; j++) {
        const cell = board[i][j];
        rowCells.push(
          <Cell
          key={`${i}-${j}`}
          x={i}
          y={j}
          isMine={cell.isMine}
          isOpen={cell.isOpen}
          isFlagged={cell.isFlagged}
          count={cell.count}
          onClick={handleCellClick}
          onRightClick={handleCellRightClick}/>
        )
      }
      rows.push(
        <div key={i + 'row'} className={styles.row}>
          {rowCells}
        </div>
      )
    }
    return rows;
  }

  return (
    <div className={cx(styles.wrapper, "inner-wrapper")}>
      {board.length > 0 && renderCells()}
    </div>
  )
}
export default Board