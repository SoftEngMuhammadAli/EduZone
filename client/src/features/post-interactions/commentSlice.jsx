import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create comment
export const createComment = createAsyncThunk(
  "comment/create",
  async (payload) => {
    const res = await axios.post("/api/comments", payload);
    return res.data.data;
  }
);

export const getComments = createAsyncThunk(
  "comment/getAll",
  async (courseId) => {
    const res = await axios.get(`/api/comments?courseId=${courseId}`);
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
        state.loading = false;
        state.error = action.payload;
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
