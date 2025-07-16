import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios";

// Create Like
export const createLike = createAsyncThunk("likes/create", async (payload) => {
  const res = await axios.post("/api/likes", payload);
  return res.data.data;
});

// getLikesByCourse
export const getLikesByCourse = createAsyncThunk(
  "likes/getByCourse",
  async (courseId) => {
    const res = await axios.get(`/api/likes?courseId=${courseId}`);
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
      // Create Like
      .addCase(createLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLike.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Likes by Course
      .addCase(getLikesByCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikesByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getLikesByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLikeError } = likeSlice.actions;

export default likeSlice.reducer;
