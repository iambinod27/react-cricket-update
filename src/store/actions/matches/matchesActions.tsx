import { createAsyncThunk } from "@reduxjs/toolkit";
import sportsAxios from "../../../axios/axios";

export type MatchStatus = "live" | "recent" | "upcoming";

export const getMatches = createAsyncThunk(
  "matches/list",
  async (status: MatchStatus) => {
    const res = await sportsAxios.get(`/matches/v1/${status}`);
    return { status, data: res.data };
  }
);