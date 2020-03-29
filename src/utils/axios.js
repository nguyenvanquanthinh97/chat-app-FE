import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_CHAT_WHISPER,
  timeout: 2000
});

export default axiosInstance;