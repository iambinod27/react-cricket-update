import { getNews, getNewsDetail } from "@/store/actions/news/newsActions";
import { createSlice } from "@reduxjs/toolkit";

interface NewsInitialState {
  isLoading: boolean;
  newsList: Array<{
    story: {
      id: number;
    };
  }>;
  news: {
    coverImage: {
      id: number;
      caption: string;
      source: string;
    };
    headline: string;
    authors: Array<{
      name: string;
    }>;
    storyType: string;
    source: string;
    context: string;
    intro: string;
    content: Array<{
      content: {
        contentValue: string;
      };
    }>;
  };
}

const initialState: NewsInitialState = {
  isLoading: true,
  newsList: [],
  news: {},
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    newsCleanUp: (state) => {
      state.news = {};
    },
  },
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
    builder.addCase(getNewsDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNewsDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.news = action.payload;
    });
    builder.addCase(getNewsDetail.rejected, (state) => {
      state.isLoading = true;
    });
  },
});

export const { newsCleanUp } = newsSlice.actions;

export default newsSlice.reducer;
