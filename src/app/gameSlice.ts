import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {

}

const initialState: IUserState = {

}

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {

  },
  extraReducers: {}
})

export const {

} = gameSlice.actions

export default gameSlice;