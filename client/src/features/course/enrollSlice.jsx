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
        },
      );

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Enrollment failed";
      const statusCode = error.response?.status;

      return thunkAPI.rejectWithValue({ message, statusCode });
    }
  },
);

// fetch enroll courses by user id
export const fetchEnrolledCourses = createAsyncThunk(
  "courses/fetchEnrolledCourses",
  async (userId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/courses/user/enrollments/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch",
      );
    }
  },
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
      // Enroll in Course
      .addCase(enrollInCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.data = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Enrollment failed";
        state.data = null;
      })

      // Fetch Enrolled Courses by UserID
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.status = "loading";
        state.courses = [];
        state.error = null;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearEnrollmentStatus } = enrollSlice.actions;
export default enrollSlice.reducer;
