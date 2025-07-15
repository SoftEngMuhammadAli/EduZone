import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

// THUNKS
export const createBlogThunk = createAsyncThunk(
  "blogs/createBlog",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "CREATE BLOG ERROR:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error creating blog"
      );
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  "blogs/fetch-blogs",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/blogs");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getAllBlogs = createAsyncThunk(
  "blogs/get-blog-by-id",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/blogs/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getBlogById = createAsyncThunk(
  "blogs/getBlogById",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/api/blogs/${id}`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed to fetch blog"
      );
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, blogData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/api/blogs/${id}`, blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to update blog"
      );
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/api/blogs/${id}`);
      return { _id: id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBlogCategories = createAsyncThunk(
  "blogCategories/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/api/blog-categories");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch categories");
    }
  }
);

// SLICE
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    selectedBlog: null,
    createdBlog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlogThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        // state.createdBlog = action.payload;
        state.blogs = [...state.blogs, action.payload];
      })
      .addCase(createBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload._id
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const blogCategorySlice = createSlice({
  name: "blogCategories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchBlogCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const blogReducer = blogSlice.reducer;
export const blogCategoryReducer = blogCategorySlice.reducer;
