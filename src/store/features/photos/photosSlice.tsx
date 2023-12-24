import { getPhotos } from "@/store/actions/photos/photosActions";
import { createSlice } from "@reduxjs/toolkit";

interface PhotoInitialState {
  isLoading: boolean;
  Photo: any;
}

const initialState: PhotoInitialState = {
  isLoading: true,
  Photo: "",
};

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPhotos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Photo = action.payload;
    });
    builder.addCase(getPhotos.rejected, (state) => {
      state.isLoading = true;
    });
  },
});

export default photoSlice.reducer;
