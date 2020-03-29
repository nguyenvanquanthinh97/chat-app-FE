import axios from '../utils/axios';

export const postLogin = async (email, password) => {
  try {
    const response = axios.post(`${process.env.REACT_APP_BACKEND_CHAT_WHISPER}/auth/login`, { email, password });
    return response;
  } catch (error) {
    throw error;
  }
};
