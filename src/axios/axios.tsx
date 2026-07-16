// axios.tsx
import axios from "axios";

const sportsAxios = axios.create({
  baseURL: "/api/proxy",
});

sportsAxios.interceptors.request.use((config) => {
  const raw = (config.url ?? "").replace(/^\/+/, "");
  const parsed = new URL(raw, "http://x"); // dummy base just to parse any embedded query string

  const extraParams: Record<string, string> = {};
  parsed.searchParams.forEach((v, k) => {
    extraParams[k] = v;
  });

  config.params = { ...(config.params ?? {}), ...extraParams, path: parsed.pathname };
  config.url = "";
  return config;
});

export default sportsAxios;