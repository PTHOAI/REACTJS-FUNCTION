import axios from 'axios';
import authHeader from '../services/auth.header';
const API_BASE_URL = 'http://localhost:3001';

const apiService = axios.create({
  baseURL: API_BASE_URL,
});
const headers = authHeader();
// tạo xe
 const createCarData = async (carData,file) => {
  try {
      const formData = new FormData();
      formData.append('nameCar', carData.nameCar);
      formData.append('codeCar', carData.codeCar);
      formData.append('groupId', carData.groupId);
      formData.append('creator', carData.groupId);
      formData.append('trademarkId', carData.trademarkId);
      formData.append('userId', carData.creator);
      formData.append('description', carData.description);
      formData.append('img', file);
    const response = await apiService.post('/parts/createcar',formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// lấy thông tin nhóm xe 
const fetchGroupCarData = async () => {
    try {
       
      const response = await apiService.get('/parts/getgroupcar');
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

// lấy danh sách thương hiệu xe
  const fetchListTradeMarkData = async () => {
    try {    
      const response = await apiService.get('/parts/getlisttrademark');
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

 // lấy danh sách xe
 const fetchListCar = async () => {
    try {    
      const response = await apiService.get('/parts/getcar',{ headers });
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  export default { 
    createCarData,
    fetchGroupCarData,
    fetchListTradeMarkData,
    fetchListCar,
    API_BASE_URL
  };