import axios from 'axios';
import authHeader from '../services/auth.header';
const API_BASE_URL = 'http://localhost:3001';

const apiService = axios.create({
  baseURL: API_BASE_URL,
});
  // LẤY DANH SÁCH LINH KIỆN
  const fetchGetListComponent = async (currentPage,itemsPerPage) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/getlistcomponent?page=${currentPage}&pageSize=${itemsPerPage}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  // THÊM DANH SÁCH LINH KIỆN 
  const createListComponent = async (data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/component/createlistcomponent`,data,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  // LẤY DANH SÁCH TÌM KIẾM LINH KIỆN
  const fetchGetListSearchComponent = async (search,currentPage,itemsPerPage) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/getlistsearchcomponent?search=${search}&page=${currentPage}&pageSize=${itemsPerPage}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // XÓA 1 LIST HOẶC NHIỀU LINH KIỆN 1 LẦN 
  const deleteComponents = async (data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.delete(`/component/deletelistcomponent`,{ data: { data } },{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY DANH SÁCH CỤM LINH KIỆN
  const getListPackageComponent = async (currentPage,itemsPerPage)=>{
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/getlistpackagecomponent?page=${currentPage}&pageSize=${itemsPerPage}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  }

   // THÊM DANH SÁCH LINH KIỆN 
   const createListPackageComponent = async (data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/component/createlistpackagecomponent`,data,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY DANH SÁCH TÌM KIẾM CỤM LINH KIỆN
  const fetchGetListSearchPackageComponent = async (search,currentPage,itemsPerPage) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/getlistsearchpackagecomponent?search=${search}&page=${currentPage}&pageSize=${itemsPerPage}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // XÓA 1 LIST HOẶC NHIỀU BOM CỤM 1 LẦN 
   const deletePackageComponents = async (data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.delete(`/component/deletelistpackagecomponent`,{ data: { data } },{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // LẤY DANH SÁCH CỤM BOM
   const getListPackageBomComponent = async (currentPage,itemsPerPage)=>{
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/getlistpackagebomcomponent?page=${currentPage}&pageSize=${itemsPerPage}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  }

   // LẤY DANH SÁCH TÌM KIẾM BOM CỤM LINH KIỆN
   const fetchGetListSearchPackageBomComponent = async (search,currentPage,itemsPerPage) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/getlistsearchpackagebomcomponent?search=${search}&page=${currentPage}&pageSize=${itemsPerPage}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // THÊM DANH SÁCH LINH KIỆN 
   const createListPKBom = async (data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/component/createlistpackagebom`,data,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // THÊM DANH SÁCH LINH KIỆN 
  const UploadFileSvg = async (data) => {
    const headers = authHeader();
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append("files", data[i]);
    }
  
    try {    
      const response = await apiService.post(`/component/uploadsvg`,formData,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // THÊM DANH SÁCH LINH KIỆN 
   const getPackageBom= async (id) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/mappackage/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // TẠO LINH KIỆN
  const createUnitCom = async (Data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/component/createComponent`,Data,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY DANH SÁCH ĐƠN VỊ LINH KIỆN 
  const getUnitComs = async () => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/getAllunitComs`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY DANH SÁCH CỤM LINH KIỆN 
  const getALLPKCom = async () => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/getAllPKCom`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY DANH SÁCH LINH KIỆN 
  const getALLCom = async () => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/getAllCom`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // TẠO CỤM LINH KIỆN
  const createPkCom = async (Data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/component/createPackageComponent`,Data,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // TẠO CỤM LINH KIỆN
   const createPkBOM = async (Data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/component/createPackageBom`,Data,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // XÓA 1 LIST HOẶC NHIỀU LINH KIỆN 1 LẦN 
   const deleteVehicleBom = async (data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.delete(`/component/deleteVehicleBom`,{ data: { data } },{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // TẠO BOM XE
  const createVehicleBom = async (Data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/vehicle/createVehicleBom`,Data,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LƯU TRỮ LINH KIỆN
  const saveParts = async (Data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/component/saveParts`,Data,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY DANH SÁCH LƯU TRỮ LINH KIỆN
  const getALLSaveParts = async (currentPage,itemsPerPage) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/getAllSaveParts?page=${currentPage}&pageSize=${itemsPerPage}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // LẤY TỔNG LƯU TRỮ CỦA 1 NGƯỜI
   const getSUMSaveParts = async () => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/sumSaveParts`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY DANH SÁCH TÌM KIẾM LƯU TRỮ LINH KIỆN
  const getSearchALLSaveParts = async (search,fromDate,toDate,currentPage,itemsPerPage) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/getSearchAllSaveParts?search=${search}&fromDate=${fromDate}&toDate=${toDate}&page=${currentPage}&pageSize=${itemsPerPage}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY CHI TIẾT LƯU TRỮ LINH KIỆN
  const getDetailSaveParts = async (id) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/component/getDetailSaveParts/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // UPDATE LƯU TRỮ LINH KIỆN
   const updateSaveParts = async (id,data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.put(`/component/updateSaveParts/${id}`,data,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  
  export default { 
    fetchGetListComponent,
    createListComponent,
    fetchGetListSearchComponent,
    deleteComponents,
    getListPackageComponent,
    createListPackageComponent,
    fetchGetListSearchPackageComponent,
    deletePackageComponents,
    getListPackageBomComponent,
    fetchGetListSearchPackageBomComponent,
    createListPKBom,
    UploadFileSvg,
    getPackageBom,
    createUnitCom,
    getUnitComs,
    getALLPKCom,
    createPkCom,
    getALLCom,
    createPkBOM,
    deleteVehicleBom,
    createVehicleBom,
    saveParts,
    getALLSaveParts,
    getSUMSaveParts,
    getSearchALLSaveParts,
    getDetailSaveParts,
    updateSaveParts,
    API_BASE_URL
  };