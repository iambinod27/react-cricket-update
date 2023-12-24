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
