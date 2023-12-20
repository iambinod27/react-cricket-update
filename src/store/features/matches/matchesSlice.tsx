import { createSlice } from "@reduxjs/toolkit";
import { getMatches } from "../../action/matches/matchesActions.tsx";

interface IssueInitialState {
  isLoading: boolean;
  matchesList: object;
}

const initialState: IssueInitialState = {
  isLoading: true,
  matchesList: {
    typeMatches: [],
  },
};

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatches.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matchesList = action.payload;
      })
      .addCase(getMatches.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default matchesSlice.reducer;
