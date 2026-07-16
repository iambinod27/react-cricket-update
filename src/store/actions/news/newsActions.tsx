import sportsAxios from "@/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewsListResponse } from "@/types/news";

export const getNews = createAsyncThunk(
  "news/list",
  async (nextIndex: string | undefined) => {
    const url = nextIndex ? `news/v1/index?iid=${nextIndex}` : "news/v1/index";
    const res = await sportsAxios.get<NewsListResponse>(url);
    return res.data;
  }
);

export const getNewsDetail = createAsyncThunk(
  "news/detail",
  async (id: string | undefined) => {
    const res = await sportsAxios.get(`news/v1/detail/${id}`);
    return res.data;
  }
);