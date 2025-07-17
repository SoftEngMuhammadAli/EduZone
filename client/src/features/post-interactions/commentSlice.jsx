import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ courseId, text }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/api/comments/${courseId}`, {
        text,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create comment");
    }
  }
);

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/api/comments/${courseId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch comments");
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      .addCase(getComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
