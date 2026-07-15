// rankingSlice.tsx
import { getIccPlayerRaking } from "@/store/actions/ranking/rankingActions";
import { createSlice } from "@reduxjs/toolkit";

interface RankItem {
  id: number;
  rank: string;
  name: string;
  country: string;
  points: string;
  faceImageId: number;
  diff?: string;
}

interface RankingState {
  RankLoading: boolean;
  batsmen: { rank: RankItem[] };
  bowlers: { rank: RankItem[] };
}

const initialState: RankingState = {
  RankLoading: true,
  batsmen: { rank: [] },
  bowlers: { rank: [] },
};

const rankingSlice = createSlice({
  name: "ranking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIccPlayerRaking.pending, (state) => {
      state.RankLoading = true;
    });
    builder.addCase(getIccPlayerRaking.fulfilled, (state, action) => {
      state.RankLoading = false;
      state[action.payload.category] = action.payload.data;
    });
    builder.addCase(getIccPlayerRaking.rejected, (state) => {
      state.RankLoading = false;
    });
  },
});

export default rankingSlice.reducer;