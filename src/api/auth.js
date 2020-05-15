import axios from '../utils/axios';

export const postLogin = async (email, password) => {
  try {
    const response = await axios.post(`/auth/login`, { email, password });
    return response;
  } catch (error) {
    throw error;
  }
};


export const postLogout = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`/auth/logout`, {
      headers: {
        "Authorization": token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};


export const getUser = async (token, userId) => {
  try {
    const response = await axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};