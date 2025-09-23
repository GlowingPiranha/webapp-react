import axios from "axios";


const API_URL = "http://localhost:3000";

export const getMovies = async () => {
  const res = await axios.get(`${API_URL}/movies`);
  return res.data;
};

export const getMovieById = async (id) => {
  const res = await axios.get(`${API_URL}/movies/${id}`);
  return res.data;
}