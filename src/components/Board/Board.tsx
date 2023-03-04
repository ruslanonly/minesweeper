import { useEffect, useState } from "react";
import cx from "classnames";

import Cell, { CellAttributes } from "../Cell/Cell";

import styles from "./Board.module.scss"
import { SmileType } from "../UI/Smile";

type BoardProps = {
  size: number,
  numMines: number,
  gameOver: boolean,
  gameStarted: boolean,
  handleStart: () => void,
  handleWin: () => void,
  handleLose: () => void,
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>
  setNumMines: React.Dispatch<React.SetStateAction<number>>
  setSmileType: React.Dispatch<React.SetStateAction<SmileType>>
}

type RandomizeOptions = {
  excludeX?: number,
  excludeY?: number
}

const createBoard = (size: number, numMines: number, randomizeOptions: RandomizeOptions = {}) => {
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
        isQuestion: false,
        count: 0,
      }
      row.push(cell);
    }
    board.push(row);
  }
  let countCreated = 0
  while(countCreated < numMines) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    while (board[x][y].isMine && x === randomizeOptions.excludeX && y === randomizeOptions.excludeY) {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
    }
    board[x][y].isMine = true;
    countCreated++
    for (let j = Math.max(0, y - 1); j <= Math.min(size - 1, y + 1); j++) {
      for (let k = Math.max(0, x - 1); k <= Math.min(size - 1, x + 1); k++) {
        if (!board[j][k].isMine) {
          board[j][k].count++;
        }
      }
    }
  }
  return board

}

const Board = (props: BoardProps) => {
  const { size, numMines, gameOver, handleLose, handleWin, setElapsedTime, setNumMines} = props

  const [board, setBoard] = useState<CellAttributes[][]>([]);
  const [flags, setFlags] = useState(0);

  useEffect(() => {
    const newBoard = createBoard(size, numMines);
    setBoard(newBoard);
  }, [size, numMines]);

  useEffect(() => {
    if (!props.gameStarted) {
    let b = createBoard(size, 0)
      setBoard(b)
    }
  }, [props.gameStarted])

  const getCellsToOpen = (cell: CellAttributes) => {
    const cells: CellAttributes[] = [];
    for (let i = Math.max(0, cell.y - 1); i <= Math.min(size - 1, cell.y + 1); i++) {
      for (let j = Math.max(0, cell.x - 1); j <= Math.min(size - 1, cell.x + 1); j++) {
        const neighbor = board[i][j];
        if (!neighbor.isMine && !neighbor.isOpen) {
          cells.push(neighbor);
        }
      }
    }
    return cells;
  };

  const openCell = (cell: CellAttributes) => {
    if (cell.isOpen) {
      return;
    }
    const newBoard = [...board];
    newBoard[cell.y][cell.x].isOpen = true;
    setBoard(newBoard);
    if (cell.isMine) {
      handleLose();
      return;
    }
    if (cell.count === 0) {
      const cellsToOpen = getCellsToOpen(cell);
      cellsToOpen.forEach((cellToOpen) => {
        openCell(cellToOpen);
      });
    }
  };

  const getAdjacentMines = (x: number, y: number) => {
    let count = 0;
    for (let i = Math.max(x - 1, 0); i <= Math.min(x + 1, size - 1); i++) {
      for (let j = Math.max(y - 1, 0); j <= Math.min(y + 1, size - 1); j++) {
        if (board[i][j].isMine) {
          count++;
        }
      }
    }
    return count;
  };

  const handleCellClick = (x: number, y: number) => {
    let newBoard = [...board]

    if (!props.gameStarted) {
      props.handleStart()
      newBoard = createBoard(size, numMines, {excludeX: x, excludeY: y})
    }

    if (board[y][x].isFlagged || board[y][x].isOpen || gameOver) {
      return;
    }

    const cell = newBoard[y][x];

    if (cell.isMine) {
      handleLose();
      newBoard.forEach(row =>
        row.forEach(cell => {
          if (cell.isMine) {
            cell.isOpen = true;
          }
        })
      );
      setBoard(newBoard);
      return;
    }

    openCell(cell)

    setBoard(newBoard);
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
      setNumMines(numMines + 1);
      board[y][x].isFlagged = false;
      board[y][x].isQuestion = true
    } else if (cell.isQuestion) {
      setFlags(flags - 1);
      setNumMines(numMines + 1);
      board[y][x].isQuestion = false
    } else {
      setFlags(flags + 1);
      setNumMines(numMines - 1);
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
          key={`${j}-${i}`}
          x={j}
          y={i}
          isMine={cell.isMine}
          isOpen={cell.isOpen}
          isFlagged={cell.isFlagged}
          isQuestion={cell.isQuestion}
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