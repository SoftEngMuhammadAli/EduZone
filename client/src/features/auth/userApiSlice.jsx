import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

const savedUser = localStorage.getItem("user");

// GET user profile
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/api/users/${userId}`);
      return res.data.data;
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to fetch user profile";
      return rejectWithValue(errorMsg);
    }
  }
);

// UPDATE user profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/api/users/${userId}`, formData);
      return res.data.data; // ✅ return only the updated user
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to update profile";
      return rejectWithValue(errorMsg);
    }
  }
);

// Redux slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: savedUser ? JSON.parse(savedUser) : null,
    status: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
