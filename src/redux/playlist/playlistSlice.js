import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = "https://sony-music.onrender.com/";

const initialState = {
  loading: false,
  playlist: [],
  error: "",
  currentIndex: 0,
  isSongPlaying: false,
};

export const fetchPlaylist = createAsyncThunk("playlist/fetchPlaylist", () => {
  return axios
    .get(`${baseURL}api/songs/getAll`)
    .then((response) => response.data);
});

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    reset: (state) => {
      state.currentIndex = 0;
    },
    stepUp: (state) => {
      state.currentIndex = state.currentIndex + 1;
    },
    stepDown: (state) => {
      state.currentIndex = state.currentIndex - 1;
    },
    toggleMusic: (state) => {
      state.isSongPlaying = state.isSongPlaying ? false : true;
    },
    setIndex: (state, action) => {
      state.currentIndex = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.loading = false;
      state.playlist = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPlaylist.rejected, (state, action) => {
      state.loading = false;
      state.playlist = [];
      state.error = action.payload;
    });
  },
});

export default playlistSlice.reducer;
export const { reset, stepDown, stepUp, toggleMusic, setIndex } = playlistSlice.actions;
