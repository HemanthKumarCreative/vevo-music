import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "../playlist/playlistSlice";

const store = configureStore({
  reducer: playlistReducer,
});

export default store;
