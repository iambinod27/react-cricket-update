import axios from "axios";

const API_KEYS = [
  "47b9708362msha40b1089e70b1c5p1ef9c6jsn298da3466dff",
  "cb5ec7ed34msh127f355a92fb6c6p190dbbjsn078c41a6348f",
  "fc9ab64ffbmsh44ee1390dc476bbp11ab4bjsn7ebd3d276cc7",
  "6ee7d29619msh51273317bc024c4p17836ajsn83389fa61f05",
  "2764b99829msh25559e179afe815p1ad130jsne291cb5d5911",
];

let currentKeyIndex = 0;

const sportsAxios = axios.create({
  baseURL: "https://cricbuzz-cricket.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": API_KEYS[currentKeyIndex],
    "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
  },
});

// Keep the base header in sync whenever we rotate keys
function setActiveKey(index: number) {
  currentKeyIndex = index;
  sportsAxios.defaults.headers["X-RapidAPI-Key"] = API_KEYS[currentKeyIndex];
}

sportsAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    // 429 = quota/rate-limit exceeded, 403 = sometimes used for quota exceeded too
    if ((status === 429 || status === 403) && !originalRequest._retriedAllKeys) {
      const startIndex = currentKeyIndex;

      for (let i = 0; i < API_KEYS.length - 1; i++) {
        const nextIndex = (currentKeyIndex + 1) % API_KEYS.length;
        setActiveKey(nextIndex);

        try {
          originalRequest.headers["X-RapidAPI-Key"] = API_KEYS[currentKeyIndex];
          return await sportsAxios(originalRequest);
        } catch (retryError: any) {
          if (retryError.response?.status !== 429 && retryError.response?.status !== 403) {
            throw retryError;
          }
          // otherwise keep looping to the next key
        }
      }

      originalRequest._retriedAllKeys = true;
      console.error("All RapidAPI keys exhausted their quota.");
    }

    return Promise.reject(error);
  }
);

export default sportsAxios;