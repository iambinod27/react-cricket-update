import { getNews } from "@/store/actions/news/newsActions";
import { createSlice } from "@reduxjs/toolkit";

interface NewsInitialState {
  isLoading: boolean;
  newsList: Array<{
    story: {
      id: number;
    };
  }>;
}

const initialState: NewsInitialState = {
  isLoading: true,
  newsList: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newsList = action.payload.storyList;
    });
    builder.addCase(getNews.rejected, (state) => {
      state.isLoading = true;
    });
  },
});

export default newsSlice.reducer;
