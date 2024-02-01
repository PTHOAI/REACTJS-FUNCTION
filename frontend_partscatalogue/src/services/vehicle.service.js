import axios from 'axios';
import authHeader from '../services/auth.header';
const API_BASE_URL = 'http://localhost:3001';

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

// LẤY DANH SÁCH THƯƠNG HIỆU THEO ID ĐƠN VỊ
  const fetchListTradeMarkData = async (id) => {
    const headers = authHeader();
    try {    
      // sửa api
      const response = await apiService.get(`/vehicle/getGoupVehicle/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
 // LẤY DANH SÁCH ĐƠN VỊ XE
 const fetchListUnitCar = async () => {
  const headers = authHeader();
    try {    
      const response = await apiService.get('/vehicle/listgroupvehicle',{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY BỘ PHẬN XE CỦA XE 
  const fetchListPartCar = async (id) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getlistpartscar/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY CHI TIẾT CỦA 1 THƯƠNG HIỆU
  const fetchDetailTradeMark = async (id) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getdetailtrademark/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY CHI TIẾT CỦA 1 XE
  const fetchDetailVehicle = async (id) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getdetailvehicle/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  //
  const fetchPardParkage = async (id) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getlistvehiclebom/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  // LẤY CỤM BOM XE CHA CON
  const fetchChildPart = async (id) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getchild/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
   // LẤY DANH MỤC XE
   const fetchlistCar = async () => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getlistcar`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  // LẤY DANH MỤC XE
  const fetchlistGroupCar = async () => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getlistcar`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  // LẤY DANH SÁCH THƯƠNG HIỆU XE THEO ID CỦA ĐƠN VỊ XE
  const fetchListTradeMarkOfUnitCar = async (id) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getcarofsegment/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  //LẤY DANH SÁCH PHÂN KHÚC THEO ID CỦA THƯƠNG HIỆU
  const fetchlistSegment = async (id) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getsegment/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  //LẤY DANH SÁCH  XE THEO MẢNG ID CỦA PHÂN KHÚC
  const fetchlistCarOfSegment = async (iddata) => {
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/vehicle/getcarofsegment`,iddata,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY DANH SÁCH THƯƠNG HIỆU XE
  const fetchGetListTradeMark = async () => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getlisttrademark`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  // LẤY DANH SÁCH PHÂN KHÚC
  const fetchGetListSegment = async () => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getlistsegment`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  // LẤY CHI TIẾT 1 PHÂN KHÚC THEO ID
  const fetchGetDetailSegment = async (id) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/detailsegment/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
   // LẤY DANH SÁCH BỘ PHẬN XE 
  const fetchGetListVehicleParts = async (currentPage,itemsPerPage) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getlistvehicleparts?page=${currentPage}&pageSize=${itemsPerPage}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  //LẤY DANH SÁCH XE 
  const fetchlistVehicle = async () => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getlistvehicle`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  // TẠO XE
  const createCar = async (pdf_Catalog,pdf_BDSD,pdfMaintenance,picture,carData) => {
    const formData = new FormData();
    formData.append('codeCar', carData.codeCar);
    formData.append('groupId', carData.groupId);
    formData.append('nameCar', carData.nameCar);
    formData.append('segmentId', carData.segmentId);
    formData.append('description', carData.description);
    formData.append('trademarkId', carData.trademarkId);
    formData.append('pdfCatalog', pdf_Catalog);
    formData.append('pdfInstruction', pdf_BDSD);
    formData.append('pdfMaintenance', pdfMaintenance);
    formData.append('picture', picture);
    
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/vehicle/createcar`, formData ,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // TẠO THƯƠNG HIỆU XE
  const createTradeMark = async (Data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/vehicle/createtrademark`, Data,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // TẠO PHÂN PHÚC XE
   const createSegment = async (Data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/vehicle/createsegment`, Data,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // TẠO ĐƠN VỊ CHO XE
   const createUnitVehicle = async (carUnitData) => {
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/vehicle/creategroupvehicle`, carUnitData,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };


   // TẠO BỘ PHẬN CHO XE
   const createCarPart = async (carPartData) => {
    const headers = authHeader();
    try {    
      const response = await apiService.post(`/vehicle/createcarpart`, carPartData,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY DANH SÁCH THƯƠNG HIỆU THEO GROUP
  const fetchListTradeMarkOfGroup = async (id) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getlisttrademarkofgroup/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // LẤY DANH SÁCH PHÂN KHÚC THEO THƯƠNG HIỆU
   const fetchListSegmentOfTradeMark = async (id) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getlistSegmentOfTrade/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // Update XE
  const updateVehicle = async (id,data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.put(`/vehicle/updatevehicle/${id}`,data,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // LẤY DANH SÁCH BOM XE 
   const fetchGetListVehicleBom = async (currentPage,itemsPerPage) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getvehicleboms?page=${currentPage}&pageSize=${itemsPerPage}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  
  // XÓA 1  HOẶC NHIỀU ĐƠN VỊ XE 1 LẦN 
  const deleteUnitVehicle = async (data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.delete(`/vehicle/deletelistUnitVehicle`,{ data: { data } },{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // LẤY CHI TIẾT ĐƠN VỊ XE
 const fetchUnitCar = async (id) => {
  const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getGoupVehicle/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // LẤY CHI TIẾT ĐƠN VỊ XE
 const updateUnitCar = async (id,data) => {
  const headers = authHeader();
    try {    
      const response = await apiService.put(`/vehicle/updateUnitVehicle/${id}`,data,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // LẤY DANH SÁCH THƯƠNG HIỆU XE
 const fetchListTradeMark = async () => {
  const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getlistgroupcar`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

   // XÓA 1  HOẶC NHIỀU THƯƠNG HIỆU XE 1 LẦN 
   const deleteTradeMarkVehicle = async (data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.delete(`/vehicle/deletelistTradeMarkVehicle`,{ data: { data } },{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // XÓA 1 HOẶC NHIỀU PHÂN KHÚC XE 1 LẦN 
  const deleteSegMentVehicle = async (data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.delete(`/vehicle/deletelistSegmentVehicle`,{ data: { data } },{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // XÓA 1  HOẶC NHIỀU  XE 1 LẦN 
  const deleteVehicle = async (data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.delete(`/vehicle/deleteVehicles`,{ data: { data } },{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // XÓA 1  HOẶC NHIỀU  BOM CỤM 1 LẦN 
  const deletePackageBom = async (data) => {
    const headers = authHeader();
    try {    
      const response = await apiService.delete(`/vehicle/deletePackageBom`,{ data: { data } },{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };


  // LẤY DANH SÁCH BỘ PHẬN 
  const getALLPart = async (id) => {
    const headers = authHeader();
    try {    
      const response = await apiService.get(`/vehicle/getPart/${id}`,{headers});
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };



  
  export default { 
    fetchListTradeMarkData,
    fetchDetailVehicle,
    fetchListUnitCar,
    fetchListPartCar,
    fetchDetailTradeMark,
    fetchPardParkage,
    fetchChildPart,
    fetchlistCar,
    fetchlistGroupCar,
    fetchlistSegment,
    fetchlistCarOfSegment,
    fetchGetListTradeMark,
    fetchGetListSegment,
    createCar,
    fetchGetDetailSegment,
    fetchGetListVehicleParts,
    fetchlistVehicle,
    createCarPart,
    fetchListTradeMarkOfGroup ,
    fetchListSegmentOfTradeMark,
    updateVehicle,
    fetchGetListVehicleBom,
    createUnitVehicle,
    deleteUnitVehicle,
    fetchUnitCar,
    updateUnitCar,
    fetchListTradeMark,
    createTradeMark,
    deleteTradeMarkVehicle,
    createSegment,
    deleteSegMentVehicle,
    deleteVehicle,
    deletePackageBom,
    getALLPart,
    API_BASE_URL
  };