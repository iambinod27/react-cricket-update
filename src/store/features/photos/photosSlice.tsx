import { getPhotos } from "@/store/actions/photos/photosActions";
import { createSlice } from "@reduxjs/toolkit";

interface PhotoInitialState {
  PhotoLoading: boolean;
  Photo: string;
}

const initialState: PhotoInitialState = {
  PhotoLoading: true,
  Photo: "",
};

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    photoCleanUp: (state) => {
      state.Photo = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPhotos.pending, (state) => {
      state.PhotoLoading = true;
    });
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.PhotoLoading = false;
      state.Photo = action.payload;
    });
    builder.addCase(getPhotos.rejected, (state) => {
      state.PhotoLoading = true;
    });
  },
});

export const { photoCleanUp } = photoSlice.actions;

export default photoSlice.reducer;
