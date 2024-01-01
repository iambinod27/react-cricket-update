import { getIccPlayerRaking } from "@/store/actions/ranking/rankingActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  RankLoading: true,
  batsmen: [],
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
      state.RankLoading = true;
      state.batsmen = action.payload;
    });
    builder.addCase(getIccPlayerRaking.rejected, (state) => {
      state.RankLoading = true;
    });
  },
});

export default rankingSlice.reducer;
