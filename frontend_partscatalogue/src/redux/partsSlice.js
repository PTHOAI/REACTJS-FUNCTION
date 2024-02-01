import { createSlice } from '@reduxjs/toolkit';

const partsSlice = createSlice({
  name: 'parts',
  initialState: {
    data: [],
    loading: false,
    err: false,
    id : 
    {
    idVehicle :'',
    idTradeMark:'',
    idGroupVehicle:'',
    idSegment:''
   },
    idPart:''
  },
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state) => {
      state.loading = false;
    },
      createPartsStart: (state) => {
        state.loading = true;
      },
      createPartsSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
      createPartsFailure: (state) => {
        state.loading = false;
        state.err = true;
      },

      getidPartsStart: (state) => {
        state.loading = true;
      },
      getidPartsSuccess: (state, action) => { // id nhóm xe, đơn vị xe, thương hiệu xe
        state.loading = false;
        state.id.idVehicle = action.payload.idvehicle;
        state.id.idTradeMark = action.payload.idTradeMark;
        state.id.idGroupVehicle = action.payload.idGroup;
        state.id.idSegment = action.payload.idSegment;
      },
      getidPartsVehicle: (state, action) => {
        state.loading = false;
        state.idPart = action.payload;
     },
      getidPartsFailure: (state) => {
        state.loading = false;
        state.err = true;
      },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure,createPartsSuccess ,createPartsFailure,createPartsStart,getidPartsStart,getidPartsSuccess,getidPartsFailure,getidPartsVehicle} = partsSlice.actions;
export default partsSlice.reducer;

