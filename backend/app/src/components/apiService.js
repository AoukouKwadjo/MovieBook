// apiService.js

import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const apiService = axios.create({ 
  baseURL: API_BASE_URL,
  timeout: 10000, // Adjust timeout as needed 
  headers: { 
    'Content-Type': 'application/json',
    Authorization: `85fc35c21b887c9714daa6d1060e0fc606bd057d`, // Retrieve user token from storage

    // Add other headers if required (e.g., authorization headers)
  },
});
  
const ApiService = { 
  fetchMovies: async () => {
    try {
      const response = await apiService.get('movies/');
      return response.data; 
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  fetchPopularMovies: async () => {
    try {
      const response = await apiService.get('movies/');
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  fetchLikedMovies: async () => {
    try {
      const response = await apiService.get('movies/liked/');
      return response.data;
    } catch (error) {
      console.error('Error fetching liked movies:', error);
      throw error;
    }
  },

  fetchPlaylists: async () => {
    try {
      const response = await apiService.get('playlists/');
      return response.data;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      throw error;
    }
  },

  fetchMovieDetails: async (movieId) => {
    try {
      const response = await apiService.get(`movies/${movieId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  downloadMovie: async (movieId) => {
    try {
      const response = await apiService.get(`movies/${movieId}/download/`);
      // Process download here if needed
      return response.data;
    } catch (error) {
      console.error('Error downloading movie:', error);
      throw error;
    }
  },

  // Add more functions for other endpoints as needed
};

export default ApiService;
