import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SmileType = "smile" | "smile-active" | "scared" | "win" | "lose"
export type GameResultType = "win" | "lose" | undefined

interface IMinesweeperState {
  smile: SmileType,
  result: GameResultType,
  gameOver: boolean,
  mines: number,
  elapsedTime: number,
  lastClicked: {
    x: number,
    y: number
  }
}

const initialState: IMinesweeperState = {
  smile: "smile",
  result: undefined,
  gameOver: false,
  mines: 0,
  elapsedTime: 0,
  lastClicked: {
    x: -1,
    y: -1
  }
}

const minesweeperSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    setSmile: (state, action: PayloadAction<SmileType>) => {
      state.smile = action.payload
    },
    setResult: (state, action: PayloadAction<GameResultType>) => {
      state.result = action.payload
    },
    setGameOver: (state, action: PayloadAction<boolean>) => {
      state.gameOver = action.payload
    },
    setMines: (state, action: PayloadAction<number>) => {
      state.mines = action.payload
    },
    setLastClicked: (state, { payload }: PayloadAction<IMinesweeperState['lastClicked']>) => {
      state.lastClicked = {
        x: payload.x,
        y: payload.y
      }
    },
    incElapsedTime: (state) => {
      state.elapsedTime++
    },
    reset: (state) => {
      state.elapsedTime = 0
      state.smile = "smile"
      state.gameOver = false
      state.result = undefined
    },
  },
  extraReducers: {}
})

export const {
  setSmile,
  incElapsedTime,
  setMines,
  reset,
  setGameOver,
  setResult,
  setLastClicked
} = minesweeperSlice.actions

export default minesweeperSlice;