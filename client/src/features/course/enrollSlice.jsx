import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// enroll in a course
export const enrollInCourse = createAsyncThunk(
  "enroll/enrollInCourse",
  async ({ userId, courseId }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/courses/user/enrollments`,
        { userId, courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Enrollment failed"
      );
    }
  }
);

const enrollSlice = createSlice({
  name: "enroll",
  initialState: {
    status: null,
    error: null,
    data: null,
  },
  reducers: {
    clearEnrollmentStatus: (state) => {
      state.status = null;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(enrollInCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.data = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; // { message, enrollment }
        state.error = null;
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const { clearEnrollmentStatus } = enrollSlice.actions;
export default enrollSlice.reducer;
