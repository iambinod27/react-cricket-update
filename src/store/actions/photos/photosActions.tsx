import sportsAxios from "@/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPhotos = createAsyncThunk(
  "getImage",
  async (payload: number) => {
    try {
      const res = await sportsAxios.get(`/img/v1/i1/c${payload}/i.jpg`, {
        responseType: "blob",
        params: { p: "de", d: "high" },
      });

      if (res.status === 200) {
        const imageUrl = URL.createObjectURL(res.data);
        return imageUrl;
      } else {
        console.error("Error fetching image:", res.statusText);
      }
      const data = await res.data;
      return data;
    } catch (error) {
      throw error;
    }
  }
);
