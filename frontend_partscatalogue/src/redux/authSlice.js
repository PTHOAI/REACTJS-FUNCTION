import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
export const signin = createAsyncThunk("auth/signin",async (userData) => {
  const response = await authService.login(userData);
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    pending: false,
    error: false,
    isloading: false,
    message: "",
    token: "",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      authService.logoutAuth();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.message = "loading";
        state.isloading = false;
        state.error = "Sai tên đang nhập hoặc mật khẩu";
        state.message = "";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.message = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        state.message = "";
        state.error = "";
      })
      .addCase(signin.rejected, (state, action) => {
        state.message = action.payload.content.message;
        state.error = "error";
        state.isloading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;