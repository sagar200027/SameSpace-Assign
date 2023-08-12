// src/store/reducers.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Your initial state goes here
  //   songsList: [],
  selectedTab: 1,
  selectedSong: null,
  currentSongIndex: 0,
  songsLength: 0,
  gradientColors: [],
};

const counterSlice = createSlice({
  name: "stateChange",
  initialState,
  reducers: {
    tab(state, actions) {
      // console.log("tab state", actions);
      state.selectedTab = actions?.payload;
    },
    song(state, actions) {
      // console.log("tab state", actions);
      state.selectedSong = actions?.payload;
    },
    songLength(state, actions) {
      state.songsLength = actions.payload;
    },
    currentIndex(state, actions) {
      state.currentSongIndex = actions.payload;
    },
    setGradientColors(state, actions) {
      state.gradientColors = [
        actions.payload[0],
        actions.payload[0],
        actions.payload[0],
      ];
      console.log("actions.payload", actions.payload);
    },
    // songs(state) {
    //   console.log("songs state", state);
    //   state.songsList = state;
    // },
    // Add more reducers here if needed
  },
});

export const { tab, song, songLength, setGradientColors, currentIndex } =
  counterSlice.actions;
export default counterSlice.reducer;
