import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SmileType = "smile" | "smile-active" | "scared" | "win" | "lose"

export const BASE_CONFIG = {
  boardSize: 16,
  numMines: 40
}

interface IMinesweeperState {
  smile: SmileType,
  numMines: number,
  elapsedTime: number
}

const initialState: IMinesweeperState = {
  smile: "smile",
  numMines: BASE_CONFIG.numMines,
  elapsedTime: 0
}

const minesweeperSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    setSmile: (state, action: PayloadAction<SmileType>) => {
      state.smile = action.payload
    },
    setNumMines: (state, action: PayloadAction<number>) => {
      state.numMines = action.payload
    },
    incElapsedTime: (state) => {
      state.elapsedTime++
    },
    reset: (state) => {
      state.numMines = BASE_CONFIG.numMines
      state.elapsedTime = 0
      state.smile = "smile"
    },
  },
  extraReducers: {}
})

export const {
  setSmile,
  incElapsedTime,
  setNumMines,
  reset
} = minesweeperSlice.actions

export default minesweeperSlice;