// rankingActions.tsx
import sportsAxios from "@/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type RankFormat = "test" | "odi" | "t20";
export type RankCategory = "batsmen" | "bowlers";

interface RankingParams {
  category: RankCategory;
  formatType: RankFormat;
}

export const getIccPlayerRaking = createAsyncThunk(
  "ranking/playerRanking",
  async ({ category, formatType }: RankingParams) => {
    const res = await sportsAxios.get(`stats/v1/rankings/${category}`, {
      params: { formatType },
    });
    return { category, data: res.data };
  }
);