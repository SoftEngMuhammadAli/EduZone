import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

export const createComment = createAsyncThunk(
  "comment/create",
  async ({ courseId, commentOnPost }, thunkAPI) => {
    try {
      localStorage.getItem("token");
      const res = await axiosInstance.post("/api/comments", {
        courseId,
        commentOnPost,
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getComments = createAsyncThunk(
  "comment/getByCourse",
  async (courseId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/api/comments/course/${courseId}`);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
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
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
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
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCommentError } = commentSlice.actions;
export default commentSlice.reducer;
