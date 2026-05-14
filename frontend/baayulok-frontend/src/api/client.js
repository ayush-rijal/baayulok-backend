import axios from 'axios';

const client = axios.create({
  baseURL:  'https://localhost:7012',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request automatically
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('bl_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response error handler
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.title ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default client;