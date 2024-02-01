import { createSlice } from '@reduxjs/toolkit';

const cartsPartSlice = createSlice({
  name: 'carts',
  initialState: {
    data: [],
    loading: false,
    err: false,
    quality:0
  },
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.quality = action.payload + state.quality;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, } = cartsPartSlice.actions;
export default cartsPartSlice.reducer;
