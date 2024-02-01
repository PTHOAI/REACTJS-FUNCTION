import axios from 'axios';
import authHeader from '../services/auth.header';
const API_BASE_URL = 'http://localhost:3001';

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

 const fetchData = async () => {
  try {
    const response = await apiService.get('/data');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postData = async (data) => {
  try {
    const response = await apiService.post('/data', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

 const login = async (data) => {
  try {
    const response = await apiService.post('/auth/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const signUp = async (data) => {
  console.log("data",data)
  try {
    const headers = authHeader();
    const response = await apiService.post('/auth/createUser', data,{headers});
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logoutAuth = () => {
    localStorage.removeItem("user");
    return null;
  };

  const fetchDataRoles = async () => {
    try {
      const response = await apiService.get('/auth/getAllRole');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
  
  export default {
    fetchDataRoles,
    logoutAuth,
    fetchData,
    postData,
    login,
    signUp,
    API_BASE_URL
  };