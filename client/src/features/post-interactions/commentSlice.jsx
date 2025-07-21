import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";
import { useParams } from "react-router-dom";

// CREATE COMMENT
export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ courseId, text }, { rejectWithValue }) => {
    try {
      console.log("Course Id From Slice", id);

      const res = await axiosInstance.post(`/api/comments/${courseId}`, {
        text,
      });
      console.log("Comment created successfully:", res.data);
      return res.data;
    } catch (err) {
      console.error(
        "Error creating comment:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || "Failed to create comment");
    }
  }
);

// GET COMMENTS
export const getComments = createAsyncThunk(
  "comments/getComments",
  async (courseId, { rejectWithValue }) => {
    console.log("getComments dispatched for courseId:", courseId);

    try {
      const res = await axiosInstance.get(`/api/comments/${courseId}`);
      console.log("Comments fetched:", res.data);
      return res.data;
    } catch (err) {
      console.error(
        "Error fetching comments:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || "Failed to fetch comments");
    }
  }
);

// SLICE
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
        console.log("Adding new comment to store:", action.payload);
        state.comments.unshift(action.payload);
      })
      .addCase(getComments.pending, (state) => {
        console.log("Fetching comments...");
        state.status = "loading";
      })
      .addCase(getComments.fulfilled, (state, action) => {
        console.log("Comments loaded into store");
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        console.error("Failed to fetch comments:", action.payload);
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
