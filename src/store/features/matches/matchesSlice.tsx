import { createSlice } from "@reduxjs/toolkit";
import { getMatches } from "../../actions/matches/matchesActions";

interface IssueInitialState {
  isLoading: boolean;
  matchesList: Array<{
    matchType: string;
  }>;
}

const initialState: IssueInitialState = {
  isLoading: true,
  matchesList: [],
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
        state.matchesList = action.payload.typeMatches;
      })
      .addCase(getMatches.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default matchesSlice.reducer;
