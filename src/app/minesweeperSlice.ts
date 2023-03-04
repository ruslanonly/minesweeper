import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SmileType = "smile" | "smile-active" | "scared" | "win" | "lose"
export type GameResultType = "win" | "lose" | undefined

export const BASE_CONFIG = {
  boardSize: 16,
  numMines: 40
}

interface IMinesweeperState {
  smile: SmileType,
  result: GameResultType,
  gameOver: boolean,
  numMines: number,
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
  numMines: BASE_CONFIG.numMines,
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
    setNumMines: (state, action: PayloadAction<number>) => {
      state.numMines = action.payload
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
      state.numMines = BASE_CONFIG.numMines
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
  setNumMines,
  reset,
  setGameOver,
  setResult,
  setLastClicked
} = minesweeperSlice.actions

export default minesweeperSlice;