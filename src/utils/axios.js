import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://chat-app-be.tk",
  timeout: 2000
});

export default axiosInstance;