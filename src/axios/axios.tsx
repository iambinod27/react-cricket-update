import axios from "axios";

const sportsAxios = axios.create({
  baseURL: "/api/cricbuzz",
});

export default sportsAxios;