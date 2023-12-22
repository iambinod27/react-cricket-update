import { createAsyncThunk } from "@reduxjs/toolkit";
import sportsAxios from "../../../axios/axios";

export const getMatches = createAsyncThunk("movies/list", async () => {
  try {
    const res = await sportsAxios.get("/matches/v1/recent", {
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
