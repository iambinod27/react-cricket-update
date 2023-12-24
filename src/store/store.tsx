import { configureStore } from "@reduxjs/toolkit";
import matchesReducer from "./features/matches/matchesSlice";
import newsReducer from "./features/news/newsSlice";
import photosReducer from "./features/photos/photosSlice";

const store = configureStore({
  reducer: {
    matches: matchesReducer,
    news: newsReducer,
    photos: photosReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
