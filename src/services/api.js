import axios from "axios";

const api = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/search/multi?api_key=eb2f3bd9659b7a07bbb515ec2adf6930",
});


export default api;
