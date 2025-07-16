import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

// Create comment
export const createComment = createAsyncThunk(
  "comment/create",
  async (payload) => {
    const res = await axiosInstance.post("/api/comments", payload);
    return res.data.data;
  }
);

export const getComments = createAsyncThunk(
  "comment/getAll",
  async (courseId) => {
    const res = await axiosInstance.get(`/api/comments/course/${courseId}`);
    return res.data.data;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    error: null,
    list: [],
  },
  reducers: {
    clearCommentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        console.error("Comment failed:", action.error.message);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCommentError } = commentSlice.actions;
export default commentSlice.reducer;
