// photosSlice.tsx
import { getPhotos } from "@/store/actions/photos/photosActions";
import { createSlice } from "@reduxjs/toolkit";

interface PhotoInitialState {
  photos: Record<number, string>;
  loadingIds: number[];
}

const initialState: PhotoInitialState = {
  photos: {},
  loadingIds: [],
};

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPhotos.pending, (state, action) => {
      state.loadingIds.push(action.meta.arg);
    });
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.photos[action.meta.arg] = action.payload;
      state.loadingIds = state.loadingIds.filter((id) => id !== action.meta.arg);
    });
    builder.addCase(getPhotos.rejected, (state, action) => {
      state.loadingIds = state.loadingIds.filter((id) => id !== action.meta.arg);
    });
  },
});

export default photoSlice.reducer;