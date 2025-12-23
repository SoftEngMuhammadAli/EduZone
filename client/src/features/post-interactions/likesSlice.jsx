import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

export const toggleLike = createAsyncThunk(
  "likes/toggleLike",
  async (courseId, { rejectWithValue }) => {
    console.log("toggleLike dispatched with courseId:", courseId);

    try {
      const res = await axiosInstance.post(`/api/likes/${courseId}`);
      console.log("toggleLike response:", res.data);
      return res.data;
    } catch (err) {
      const isHTML =
        err.response?.headers["content-type"]?.includes("text/html");
      if (isHTML) {
        console.error(
          "Received HTML instead of JSON. Likely an auth or route issue."
        );
      }

      return rejectWithValue(err.response?.data || "Failed to toggle like");
    }
  }
);

export const getLikesByCourse = createAsyncThunk(
  "likes/getLikesByCourse",
  async (courseId, { rejectWithValue }) => {
    console.log("getLikesByCourse dispatched with courseId:", courseId);

    try {
      const res = await axiosInstance.get(`/api/likes/${courseId}`);
      console.log("getLikesByCourse response:", res.data);
      return res.data;
    } catch (err) {
      const isHTML =
        err.response?.headers["content-type"]?.includes("text/html");
      if (isHTML) {
        console.error(
          "Received HTML instead of JSON. Likely an auth or route issue."
        );
      }

      return rejectWithValue(err.response?.data || "Failed to toggle like");
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
        const { user } = action.payload;
        const existingIndex = state.likes.findIndex(
          (value) => value.user._id === user._id
        );

        if (existingIndex !== -1) {
          state.likes.splice(existingIndex, 1);
          console.log("Removed like for user:", user._id);
        } else {
          state.likes.push({ user });
          console.log("Added like for user:", user._id);
        }
      })
      .addCase(getLikesByCourse.pending, (state) => {
        state.status = "loading";
        console.log("Fetching likes...");
      })
      .addCase(getLikesByCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.likes = action.payload.likes || [];
        console.log("Likes fetched:", action.payload);
      })
      .addCase(getLikesByCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Failed to fetch likes:", action.payload);
      });
  },
});

export default likesSlice.reducer;
