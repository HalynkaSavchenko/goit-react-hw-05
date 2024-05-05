import axios from 'axios';

const KEY = 'e43200d8940fe818bd530547cf5c2e13';
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDMyMDBkODk0MGZlODE4YmQ1MzA1NDdjZjVjMmUxMyIsInN1YiI6IjY2MzI4Yjc1YzM5MjY2MDEyMzZkMjdmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RQsvVhxxVhy90DlAAtpSgu5zv0LIIxEcn9FtWO3q_L0';
const options = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
}

const baseURL= 'https://api.themoviedb.org/3';

export const getData = async(currentPage) => {
    const url = `${baseURL}/trending/movie/week?language=uk-UKR&page=${currentPage}`;
    return await axios.get(url, options)
};

export const getDataById = async(id) => {
  const url = `${baseURL}/movie/${id}?language=uk-UKR`;
  return await axios.get(url, options)
};

export const getDataCast = async(id) => {
  const url = `${baseURL}/movie/${id}/credits?language=uk-UKR`;
  return await axios.get(url, options)
};

export const getDataReviews = async(id) => {
  const url = `${baseURL}/movie/${id}/reviews?language=uk-UKR`;
  return await axios.get(url, options)
};

export const getDataByQuery = async(query) => {
  const url = `${baseURL}/search/movie?query=${query}&language=uk-UKR`;
  return await axios.get(url, options)
};