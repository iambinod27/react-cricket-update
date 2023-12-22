import axios from "axios";

const sportsAxios = axios.create({
  baseURL: "https://cricbuzz-cricket.p.rapidapi.com",
});

export default sportsAxios;
