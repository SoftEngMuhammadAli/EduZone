import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

export const createComment = createAsyncThunk(
  "comment/create",
  async (payload) => {
    const res = await axiosInstance.post("/api/comments", payload);
    return res.data.data;
  }
);

export const getComments = createAsyncThunk(
  "comment/getByCourse",
  async (courseId) => {
    const res = await axiosInstance.get(`/api/comments/course/${courseId}`);
    return res.data.data;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCommentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export const { clearCommentError } = commentSlice.actions;
export default commentSlice.reducer;
