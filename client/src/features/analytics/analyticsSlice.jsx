import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

const extractAnalyticsData = (response) => response?.data?.data || null;

export const fetchAdminAnalytics = createAsyncThunk(
  "analytics/fetchAdminAnalytics",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/analytics/admin");
      return extractAnalyticsData(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch admin analytics",
      );
    }
  },
);

export const fetchInstructorAnalytics = createAsyncThunk(
  "analytics/fetchInstructorAnalytics",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/analytics/instructor");
      return extractAnalyticsData(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch instructor analytics",
      );
    }
  },
);

export const fetchStudentAnalytics = createAsyncThunk(
  "analytics/fetchStudentAnalytics",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/analytics/student");
      return extractAnalyticsData(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch student analytics",
      );
    }
  },
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    admin: null,
    instructor: null,
    student: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAnalyticsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(fetchAdminAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchInstructorAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.instructor = action.payload;
      })
      .addCase(fetchInstructorAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStudentAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(fetchStudentAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAnalyticsError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
