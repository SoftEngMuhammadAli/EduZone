import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

export const toggleLike = createAsyncThunk("likes/toggle", async (courseId) => {
  const res = await axiosInstance.put(`/api/likes/toggle/${courseId}`);
  return res.data;
});

export const getLikesByCourse = createAsyncThunk(
  "likes/getByCourse",
  async (courseId) => {
    const res = await axiosInstance.get(`/api/likes/course/${courseId}`);
    return res.data.data;
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
        // Re-fetch or update local state if needed
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getLikesByCourse.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export const { clearLikeError } = likeSlice.actions;
export default likeSlice.reducer;
