import axios from 'axios';
import authHeader from '../services/auth.header';

const API_BASE_URL = 'http://localhost:3001';

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

 const fetchUsers = async () => {
  try {
    const headers = authHeader();
    const response = await apiService.get('/users/getAll',{headers});
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
  export default {
    fetchUsers,
    API_BASE_URL
  };