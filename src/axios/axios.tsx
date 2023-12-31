import axios from "axios";

const sportsAxios = axios.create({
  baseURL: "https://cricbuzz-cricket.p.rapidapi.com",
  headers: {
    // "X-RapidAPI-Key": "47b9708362msha40b1089e70b1c5p1ef9c6jsn298da3466dff",
    "X-RapidAPI-Key": "cb5ec7ed34msh127f355a92fb6c6p190dbbjsn078c41a6348f",
    // "X-RapidAPI-Key": "fc9ab64ffbmsh44ee1390dc476bbp11ab4bjsn7ebd3d276cc7",
    // "X-RapidAPI-Key": "6ee7d29619msh51273317bc024c4p17836ajsn83389fa61f05",
    // "X-RapidAPI-Key": "2764b99829msh25559e179afe815p1ad130jsne291cb5d5911",
    "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
  },
});

export default sportsAxios;
