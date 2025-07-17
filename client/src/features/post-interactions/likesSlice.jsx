import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

export const toggleLike = createAsyncThunk(
  "likes/toggleLike",
  async (courseId, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/api/likes/toggle/${courseId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getLikesByCourse = createAsyncThunk(
  "likes/getByCourse",
  async (courseId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/api/likes/course/${courseId}`);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const likeSlice = createSlice({
  name: "likes",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearLikeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getLikesByCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikesByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getLikesByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearLikeError } = likeSlice.actions;
export default likeSlice.reducer;
