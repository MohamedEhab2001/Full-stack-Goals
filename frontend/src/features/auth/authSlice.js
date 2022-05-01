import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user) => {
    try {
      return await authService.Reg(user);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response.data.fixIt || error.response.data.msg.split("name: ")[1]
      );
    }
  }
);

//LOGIN
export const loginUser = createAsyncThunk("auth/loginUser", async (user) => {
  try {
    return await authService.Log(user);
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response.data.fixIt || error.response.data.msg.split("name: ")[1]
    );
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        state.user = null;
      });
  },
});

export const SelectAuth = (state) => state.auth;
export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
