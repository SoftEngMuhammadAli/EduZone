import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

// Create Like
export const createLike = createAsyncThunk(
  "likes/create",
  async (payload, thunkAPI) => {
    console.log("Payload sent to /api/likes:", payload);

    try {
      const response = await axiosInstance.post("/api/likes", payload);
      return response.data;
    } catch (error) {
      console.error("Like failed:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// getLikesByCourse
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
      // Create Like
      .addCase(createLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLike.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createLike.rejected, (state, action) => {
        console.error("failed:", action.error.message);
        state.loading = false;
        state.error = action.error.message;
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
