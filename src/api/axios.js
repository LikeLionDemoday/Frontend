import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_PORT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Skip token refresh for signup requests
    if (error.config?.url === '/auth/signup') {
      return Promise.reject(error);
    }

    // Handle 401 errors (unauthorized) for token refresh
    if (error.response?.status === 401 && !error.config?._retry) {
      error.config._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        
        if (!refreshToken) {
          localStorage.clear();
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_PORT}/auth/kakao/token_reissue`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", newRefreshToken);

        // Retry the original request with new token
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(error.config);

      } catch (refreshError) {
        // Refresh token is expired or invalid
        localStorage.clear();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
)


export default axiosInstance;
