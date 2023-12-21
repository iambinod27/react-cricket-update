import axios from "axios";

const sportsAxios = axios.create({
  baseURL: "https://moviesdatabase.p.rapidapi.com",
});

export default sportsAxios;
