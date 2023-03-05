import { useEffect, useMemo, useState } from "react";
import cx from "classnames";

import Cell, { CellAttributes } from "../Cell/Cell";

import styles from "./Board.module.scss"
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setLastClicked, setMines } from "../../app/minesweeperSlice";

type BoardProps = {
  size: number,
  numMines: number,
  firstMove: boolean,
  handleStart: () => void,
  handleWin: () => void,
  handleLose: () => void,
}

const getAdjacentMines = (board: CellAttributes[][], x: number, y: number) => {
  let size = board.length
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

const createBoard = (size: number, mines: number, firstX: number = -1, firstY: number = -1) => {
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
  while(countCreated < mines) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    while (board[y][x].isMine || (x === firstX && y === firstY)) {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
    }
    board[y][x].isMine = true;
    countCreated++
  }


  for (let j = 0; j < size; j++) {
    for (let k = 0; k < size; k++) {
      board[j][k].count = getAdjacentMines(board, j, k);
    }
  }

  return board
}

const getCellsToOpen = (board: CellAttributes[][], cell: CellAttributes) => {
  const size = board.length
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

const openCell = (board: CellAttributes[][], clickedCell: CellAttributes, handleLose: () => void) => {
  let curBoard = board
  const _openCell = (cell: CellAttributes) => {
    if (cell.isOpen) {
      return;
    }
    const newBoard = [...board];
    newBoard[cell.y][cell.x].isOpen = true;
    curBoard = newBoard
    if (cell.isMine) {
      handleLose();
      return;
    }
    if (cell.count === 0) {
      const cellsToOpen = getCellsToOpen(curBoard, cell);
      cellsToOpen.forEach((cellToOpen) => {
        _openCell(cellToOpen);
      });
    }
  };

  _openCell(clickedCell)
  return curBoard
}

const openAllMines = (board: CellAttributes[][]) => {
  const newBoard = [...board]
  newBoard.forEach(row =>
    row.forEach(cell => {
      if (cell.isMine) {
        cell.isOpen = true;
      }
    })
  );
  return newBoard
}

const Board = (props: BoardProps) => {
  const dispatch = useAppDispatch()
  const { size,  handleLose, handleWin } = props

  const { mines, gameOver } = useAppSelector(state => state.minesweeper)

  const [board, setBoard] = useState<CellAttributes[][]>([]);

  const won = useMemo(() => {
    if (!props.firstMove && !gameOver) {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const cell = board[i][j]
          if (!cell.isMine && !cell.isOpen) {
            return false;
          }
        }
      }
      return true;
    }
  }, [board, props.firstMove])

  if (won) {
    handleWin()
    setBoard(openAllMines(board))
  }

  useEffect(() => {
    const newBoard = createBoard(size, props.numMines);
    setBoard(newBoard);
  }, []);

  useEffect(() => {
    if (props.firstMove) {
    let b = createBoard(size, 0)
      setBoard(b)
    }
  }, [props.firstMove])

  const handleFirstMove = (x: number, y: number) => {
    let newBoard = [...board]
    props.handleStart()
    newBoard = createBoard(size, mines, x, y)
    newBoard = openCell(newBoard, newBoard[y][x], handleLose)
    setBoard(newBoard)
  }


  const handleCellClick = (x: number, y: number) => {
    if (props.firstMove) {
      console.log('firstMove')
      handleFirstMove(x, y)
      return
    }
    if (board[y][x].isFlagged || board[y][x].isOpen || gameOver) {
      return;
    }

    let newBoard = [...board]

    dispatch(setLastClicked({x, y}))

    const cell = newBoard[y][x];

    if (cell.isMine) {
      handleLose();
      newBoard = openAllMines(newBoard)
      setBoard(newBoard);
      return;
    }

    newBoard = openCell(newBoard, cell, handleLose)

    setBoard(newBoard);
  };
    
  const handleCellRightClick = (x: number, y: number) => {
    if (gameOver || props.firstMove) {
      return;
    }
    const cell = board[y][x];
    if (cell.isOpen) {
      return;
    }
    if (cell.isFlagged) {
      dispatch(setMines(mines + 1))
      board[y][x].isFlagged = false;
      board[y][x].isQuestion = true
    } else if (cell.isQuestion) {
      board[y][x].isQuestion = false
    } else {
      if (mines > 0) {
        dispatch(setMines(mines - 1))
        board[y][x].isFlagged = true;
      }
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