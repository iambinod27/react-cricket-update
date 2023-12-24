import sportsAxios from "@/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getNews = createAsyncThunk("news/list", async () => {
  try {
    const res = await sportsAxios.get("news/v1/index", {
      headers: {
        "X-RapidAPI-Key": "fc9ab64ffbmsh44ee1390dc476bbp11ab4bjsn7ebd3d276cc7",
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    throw error;
  }
});
