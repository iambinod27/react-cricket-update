import sportsAxios from "@/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPlayers = createAsyncThunk("get/players", async () => {
  try {
    const res = await sportsAxios.get("/stats/v1/player/trending");
    const data = await res.data;
    return data;
  } catch (error) {
    throw error;
  }
});
