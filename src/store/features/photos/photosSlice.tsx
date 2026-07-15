import { getPhotos } from "@/store/actions/photos/photosActions";
import { createSlice } from "@reduxjs/toolkit";

// photosSlice.tsx
interface PhotoInitialState {
  photos: Record<number, string>; // { [imageId]: url }
  loadingIds: number[];
}

const initialState: PhotoInitialState = {
  photos: {},
  loadingIds: [],
};

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    photoCleanUp: (state) => {
      state.photos = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPhotos.pending, (state, action) => {
      state.loadingIds.push(action.meta.arg); // arg = the imageID passed in
    });
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.photos[action.meta.arg] = action.payload;
      state.loadingIds = state.loadingIds.filter(
        (id) => id !== action.meta.arg,
      );
    });
    builder.addCase(getPhotos.rejected, (state, action) => {
      state.loadingIds = state.loadingIds.filter(
        (id) => id !== action.meta.arg,
      );
    });
  },
});

export const { photoCleanUp } = photoSlice.actions;
export default photoSlice.reducer;
