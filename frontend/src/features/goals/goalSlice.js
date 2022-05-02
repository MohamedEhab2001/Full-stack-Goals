import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalServices from "./goalServices";
const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  gotGoals: false,
  message: "",
};

// Create Goal
export const createGoal = createAsyncThunk(
  "goal/createGoal",
  async (text, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await goalServices.Create(token, text);
    } catch (error) {
      throw new Error(
        error.response.data.fixIt || error.response.data.msg.split("name: ")[1]
      );
    }
  }
);

// Get User Goals
export const getUserGoal = createAsyncThunk(
  "goal/getUserGoal",
  async (_ = "", thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await goalServices.Get(token);
    } catch (error) {
      throw new Error(
        error.response.data.fixIt || error.response.data.msg.split("name: ")[1]
      );
    }
  }
);

const goalsSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.goals.push(action.payload.goal);
        state.message = action.payload.message;
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(getUserGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserGoal.fulfilled, (state, action) => {
        state.gotGoals = true;
        state.isLoading = false;
        state.isError = false;
        state.goals = action.payload.goals;
      })
      .addCase(getUserGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.gotGoals = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export const { reset } = goalsSlice.actions;
export const SelectGoal = (state) => state.goal;
export default goalsSlice.reducer;
