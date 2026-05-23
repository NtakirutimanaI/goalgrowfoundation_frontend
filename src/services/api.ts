import axios from 'axios';

// Dynamically determine the backend API URL to bypass Vercel dashboard overrides
  let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('localhost')) {
      baseURL = 'http://localhost:5000/api';
    } else if (hostname === 'goalgrowfoundation-frontend.vercel.app') {
      baseURL = 'https://goalgrowfoundation-backend.vercel.app/api';
    }
  }

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

export default api;
