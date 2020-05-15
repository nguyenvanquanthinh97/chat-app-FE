import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_CHAT_WHISPER || "https://chat-app-be.tk",
  timeout: 2000
});

export default axiosInstance;