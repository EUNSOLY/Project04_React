import { configureStore, createSlice } from "@reduxjs/toolkit";
import data from "./data";

let list = createSlice({
  name: "data",
  initialState: data,
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
    },
  },
});

export default configureStore({
  reducer: {
    data: list.reducer,
  },
});
