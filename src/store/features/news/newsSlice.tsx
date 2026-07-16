import { getNews, getNewsDetail } from "@/store/actions/news/newsActions";
import { createSlice } from "@reduxjs/toolkit";
import { NewsStoryItem } from "@/types/news";

interface NewsInitialState {
  isLoading: boolean;
  newsList: NewsStoryItem[];
  nextIndex: string | null;
  news: {
    coverImage?: {
      id: number;
      caption: string;
      source: string;
    };
    headline?: string;
    authors?: Array<{ name: string }>;
    storyType?: string;
    source?: string;
    context?: string;
    intro?: string;
    publishTime?: number;
    content?: Array<{ content: { contentValue: string } }>;
  };
}

const initialState: NewsInitialState = {
  isLoading: true,
  newsList: [],
  nextIndex: null,
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
      state.newsList = [...state.newsList, ...(action.payload.storyList ?? [])];
      state.nextIndex = action.payload.appIndex?.webAppIndex ?? null;
    });
    builder.addCase(getNews.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getNewsDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNewsDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.news = action.payload;
    });
    builder.addCase(getNewsDetail.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { newsCleanUp } = newsSlice.actions;
export default newsSlice.reducer;