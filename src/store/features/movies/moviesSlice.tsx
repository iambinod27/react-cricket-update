import { createSlice } from "@reduxjs/toolkit";
import { getMovies } from "../../actions/movies/moviesActions";

interface IssueInitialState {
  isLoading: boolean;
  moviesList: string[];
}

const initialState: IssueInitialState = {
  isLoading: true,
  moviesList: [],
};

const moviesSlice = createSlice({
  name: "moives",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moviesList = action.payload.results;
      })
      .addCase(getMovies.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default moviesSlice.reducer;
