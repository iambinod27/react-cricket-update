import axios from "axios";

const sportsAxios = axios.create({
  baseURL: "https://cricbuzz-cricket.p.rapidapi.com",
  headers: {
    // "X-RapidAPI-Key": "6ee7d29619msh51273317bc024c4p17836ajsn83389fa61f05",
    "X-RapidAPI-Key": "077dd39036mshc3b715176fd1f61p14d490jsn2cccac9bcef8",
    "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
  },
});

export default sportsAxios;
