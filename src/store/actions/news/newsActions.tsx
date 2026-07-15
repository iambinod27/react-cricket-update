import sportsAxios from "@/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPhotos } from "../photos/photosActions";

export const getNews = createAsyncThunk(
  "news/list",
  async (nextIndex: string | undefined, thunkAPI) => {
    try {
      const url = nextIndex
        ? `news/v1/index?iid=${nextIndex}` // adjust param name to match what you find
        : "news/v1/index";
      const res = await sportsAxios.get(url);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

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
  },
);
