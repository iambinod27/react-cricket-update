import sportsAxios from "@/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getNews = createAsyncThunk("news/list", async () => {
  try {
    const res = await sportsAxios.get("news/v1/index", {});
    const data = res.data;
    return data;
  } catch (error) {
    throw error;
  }
});

export const getNewsDetail = createAsyncThunk(
  "/news/list/detail",
  async (payload: number) => {
    try {
      const res = await sportsAxios.get(`news/v1/detail/${payload}`);
      const data = res.data;
      return data;
    } catch (error) {
      throw error;
    }
  }
);
