import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQ0ZDhiNWUxNjI4Yzk4MWE0NDM2MDBjYjdiZTJiNyIsIm5iZiI6MTczODgzMzA1OC40NCwic3ViIjoiNjdhNDdjYTI0NzBiYjc1ZmYyNjZkYTFiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Zf12aOhV5iuDcnCW8tPuxCWCBX0hPR848PJQK0spnBc";
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { query },
    ...options,
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
  return response.data;
};
