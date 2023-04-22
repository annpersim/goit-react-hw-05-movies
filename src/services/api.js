import axios from 'axios';

const KEY = 'cfc471f0d2271b2468bfd9fc97d9b914';
const BASE_URL = 'https://api.themoviedb.org/3/';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: KEY,
  language: 'en-US',
  include_adult: false,
};

export const fetchTrendings = async () => {
  const endPoint = 'trending/movie/day';
  const response = await axios.get(endPoint);
  return response.data;
};

export const fetchSerchQuery = async query => {
  const endPoint = 'search/movie';
  const config = {
    params: { query: query },
  };
  const response = await axios.get(endPoint, config);
  return response.data;
};

export const fetchMovieDetails = async movieId => {
  const endPoint = `movie/${movieId}`;
  const response = await axios.get(endPoint);
  return response.data;
};

export const fetchCast = async movieId => {
  const endPoint = `movie/${movieId}/credits`;
  const response = await axios.get(endPoint);
  return response.data;
};

export const fetchReviews = async movieId => {
  const endPoint = `movie/${movieId}/reviews`;
  const response = await axios.get(endPoint);
  return response.data;
};
