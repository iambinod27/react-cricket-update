import { configureStore } from "@reduxjs/toolkit";
import matchesReducer from "./features/matches/matchesSlice";
import newsReducer from "./features/news/newsSlice";
import photosReducer from "./features/photos/photosSlice";
import playersReducer from "./features/players/playerSlice";

const store = configureStore({
  reducer: {
    matches: matchesReducer,
    news: newsReducer,
    photos: photosReducer,
    players: playersReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
