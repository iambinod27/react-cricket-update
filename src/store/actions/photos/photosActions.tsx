import sportsAxios from "@/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

export const getPhotos = createAsyncThunk(
  "getImage",
  async (payload: number) => {
    const res = await sportsAxios.get(`/img/v1/i1/c${payload}/i.jpg`, {
      responseType: "blob",
      params: { p: "de", d: "high" },
    });
    if (res.status !== 200) throw new Error(`Failed to fetch image: ${res.statusText}`);
    return URL.createObjectURL(res.data);
  },
  {
    condition: (payload, { getState }) => {
      const { photos } = getState() as RootState;
      if (photos.photos[payload] || photos.loadingIds.includes(payload)) {
        return false; // already have it or already fetching — skip
      }
      return true;
    },
  }
);