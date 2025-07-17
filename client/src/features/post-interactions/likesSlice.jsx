import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

export const toggleLike = createAsyncThunk(
  "likes/toggleLike",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/api/likes/${courseId}`);
      return { courseId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to toggle like");
    }
  }
);

export const getLikesByCourse = createAsyncThunk(
  "likes/getLikesByCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/api/likes/${courseId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch likes");
    }
  }
);

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    likes: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { courseId } = action.payload;
        state.likes = action.payload;
      })
      .addCase(getLikesByCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLikesByCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.likes = action.payload;
      })
      .addCase(getLikesByCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default likesSlice.reducer;
