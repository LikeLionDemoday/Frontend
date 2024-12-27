import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_PORT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
