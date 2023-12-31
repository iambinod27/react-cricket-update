import { getPlayers } from "@/store/actions/players/playerActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playLoading: true,
  players: [],
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPlayers.pending, (state) => {
      state.playLoading = true;
    });
    builder.addCase(getPlayers.fulfilled, (state, action) => {
      state.playLoading = false;
      state.players = action.payload;
    });
    builder.addCase(getPlayers.rejected, (state) => {
      state.playLoading = true;
    });
  },
});

export default playersSlice.reducer;
