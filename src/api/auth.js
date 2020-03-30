import axios from '../utils/axios';

export const postLogin = async (email, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_CHAT_WHISPER}/auth/login`, { email, password });
    return response;
  } catch (error) {
    throw error;
  }
};

export const postLogout = async () => {
  const token = localStorage.getItem('token');
  try {
    console.log("I'm here");
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_CHAT_WHISPER}/auth/logout`, {
      headers: {
        "Authorization": token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};
