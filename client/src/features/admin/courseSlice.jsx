import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

// Thunks
export const fetchCourses = createAsyncThunk(
  "course/fetchCourses",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/courses/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch courses"
      );
    }
  }
);

export const createCourse = createAsyncThunk(
  "course/createCourse",
  async (courseData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/courses", courseData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to create course"
      );
    }
  }
);

export const updateCourse = createAsyncThunk(
  "course/updateCourse",
  async ({ id, courseData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/api/courses/${id}`,
        courseData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to update course"
      );
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async ({ id }, thunkAPI) => {
    try {
      await axiosInstance.delete(`/api/courses/${id}`);
      return { _id: id };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to delete course"
      );
    }
  }
);

// Slice

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    loading: false,
    error: null,
    selectedCourse: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Course
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.courses = action.payload.data;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Course
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.courses.findIndex(
          (course) => course._id === action.payload._id
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Course
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.courses = state.courses.filter(
          (course) => course._id !== action.payload._id
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
