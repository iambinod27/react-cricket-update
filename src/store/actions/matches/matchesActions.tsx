import { createAsyncThunk } from "@reduxjs/toolkit";
import sportsAxios from "../../../axios/axios";

export const getMatches = createAsyncThunk("movies/list", async () => {
  try {
    const res = await sportsAxios.get("/matches/v1/recent", {
      headers: {
        "X-RapidAPI-Key": "384ab89b77msh4b87da90f1a2dfbp1aad0bjsndcbaa574b3a1",
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    throw error;
  }
});
