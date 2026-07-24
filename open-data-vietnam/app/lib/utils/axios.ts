import axios from 'axios';

export const axiosClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Log whenever Server initiates an API call
axiosClient.interceptors.request.use((config) => {
  console.log(`🌐 [SERVER API FETCH] Calling World Bank API: ${config.url}`);
  return config;
});

// Response Interceptor: Log response status
axiosClient.interceptors.response.use(
  (response) => {
    console.log(`✅ [SERVER API SUCCESS] Received data for: ${response.config.url}`);
    return response.data;
  },
  (error) => {
    console.error(`❌ [SERVER API ERROR] ${error.config?.url}:`, error.message);
    return Promise.reject(error);
  }
);
