import { createSlice } from "@reduxjs/toolkit";
import { getMatches } from "../../actions/matches/matchesActions";

interface SeriesMatch {
  matchType: string;
  seriesMatches: Array<{
    seriesAdWrapper?: {
      seriesId: number;
      seriesName: string;
      matches: Array<{ matchInfo: { matchId: number } }>;
    };
  }>;
}

interface MatchesState {
  isLoading: boolean;
  live: SeriesMatch[];
  recent: SeriesMatch[];
  upcoming: SeriesMatch[];
}

const initialState: MatchesState = {
  isLoading: true,
  live: [],
  recent: [],
  upcoming: [],
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
        state[action.payload.status] = action.payload.data.typeMatches;
      })
      .addCase(getMatches.rejected, (state) => {
        state.isLoading = false; // ✅ fixed
      });
  },
});

export default matchesSlice.reducer;