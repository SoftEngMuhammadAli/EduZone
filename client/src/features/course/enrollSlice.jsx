import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

export const enrollInCourse = createAsyncThunk(
  "enroll/enrollInCourse",
  async ({ userId, courseId }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/courses/enrollments", {
        userId,
        courseId,
      });
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

export const fetchEnrolledCourses = createAsyncThunk(
  "courses/fetchEnrolledCourses",
  async (userId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/api/courses/enrollments/${userId}`);
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
    courses: [],
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
        state.data = action.payload.data;
        state.error = null;
        state.courses = state.data
          ? [state.data, ...state.courses.filter((item) => item._id !== state.data._id)]
          : state.courses;
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Enrollment failed";
        state.data = null;
      })
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
