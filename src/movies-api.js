import axios from "axios";

const url = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjJkMTk2NzhjYjJiMjMwNTA2ZmJlZjViMGE3ZWQ3MyIsIm5iZiI6MTcyNTUyMTM0Ny42NzUwMzcsInN1YiI6IjY1NDc5ODkzZDU1YzNkMDBlMjEyNmJiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6oM5uJMZCS5rdCVLOrjJaEVjfHdIer9Q_O6SS2Bf9cU",
  },
};

export const getTrendingMovies = async () => {
  const response = await axios.get(`${url}/trending/movie/day`, options);
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`${url}/movie/${movieId}`, options);
  return response.data;
};

export const getSearchMovies = async (query) => {
  const response = await axios.get(
    `${url}/search/movie?query=${query}`,
    options
  );
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`${url}/movie/${movieId}/credits`, options);
  return response.data;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`${url}/movie/${movieId}/reviews`, options);
  return response.data;
};
