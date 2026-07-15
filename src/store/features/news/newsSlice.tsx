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
    publishTime: number; // ✅ add this
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
  news: {
    coverImage: {
      id: 0,
      caption: "",
      source: "",
    },
    headline: "",
    authors: [],
    storyType: "",
    source: "",
    context: "",
    intro: "",
    content: [],
    publishTime: 0, // ✅ add this
  },
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    newsCleanUp: (state) => {
      state.news = initialState.news;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.isLoading = false;
      const newStories = action.payload.storyList ?? [];
      state.newsList = [...state.newsList, ...newStories]; // append, not replace
      state.nextIndex = action.payload.appIndex?.webAppIndex ?? null; // save cursor
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
