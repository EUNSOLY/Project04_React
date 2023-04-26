import { configureStore, createSlice } from "@reduxjs/toolkit";
import data from "./data";

let list = createSlice({
  name: "data",
  initialState: data,
});
export default configureStore({
  reducer: {
    data: list.reducer,
  },
});
