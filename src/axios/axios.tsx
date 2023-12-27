import axios from "axios";

const sportsAxios = axios.create({
  baseURL: "https://cricbuzz-cricket.p.rapidapi.com",
  headers: {
    // "X-RapidAPI-Key": "6ee7d29619msh51273317bc024c4p17836ajsn83389fa61f05",
    "X-RapidAPI-Key": "2764b99829msh25559e179afe815p1ad130jsne291cb5d5911",
    "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
  },
});

export default sportsAxios;
