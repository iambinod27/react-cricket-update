import sportsAxios from "@/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getIccPlayerRaking = createAsyncThunk(
  "ranking/playerRanking",
  async () => {
    try {
      const res = await sportsAxios.get("stats/v1/rankings/batsmen", {
        params: { formatType: "test" },
      });
      const data = await res.data;
      return data;
    } catch (error) {
      throw error;
    }
  }
);
