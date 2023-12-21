import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./features/movies/moviesSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
