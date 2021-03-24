import axios from "axios";

const api_key = "eb2f3bd9659b7a07bbb515ec2adf6930";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export async function queryMovie(query, language = "en") {
  return await api.get(
    "/search/movie?api_key=" +
      api_key +
      "&language=" +
      language +
      "&query=" +
      query
  );
}

export async function getDetails(id, language = "en") {
  return await api.get(
    "/movie/" + id + "?api_key=" + api_key + "&language=" + language
  );
}

export async function getCredits(id, language = "en") {
  return await api.get(
    "/movie/" + id + "/credits?api_key=" + api_key + "&language=" + language
  );
}