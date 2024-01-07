import sportsAxios from "@/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPhotos } from "../photos/photosActions";

export const getNews = createAsyncThunk("news/list", async (_, thunkAPI) => {
  try {
    const res = await sportsAxios.get("news/v1/index", {});
    const data = res.data;
    // data.storyList.forEach((item: object) => {
    //   const { imageId } = item.story;
    //   thunkAPI.dispatch(getPhotos(imageId));
    // });
    return data;
  } catch (error) {
    throw error;
  }
});

export const getNewsDetail = createAsyncThunk(
  "/news/list/detail",
  async (payload: string | undefined) => {
    try {
      const res = await sportsAxios.get(`news/v1/detail/${payload}`);
      const data = res.data;
      return data;
    } catch (error) {
      throw error;
    }
  }
);
