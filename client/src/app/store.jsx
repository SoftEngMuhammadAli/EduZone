import { configureStore } from "@reduxjs/toolkit";
import authReducer from ".././features/auth/authSlice";
import contactUsReducer from "../features/contact-us/contactUsSlice";
import { blogReducer } from "../features/admin/blogSlice";
import courseReducer from "../features/admin/courseSlice";
import enrollReducer from "../features/course/enrollSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    contactUs: contactUsReducer,
    blogs: blogReducer,
    course: courseReducer,
    enroll: enrollReducer,
  },
});

export default store;
