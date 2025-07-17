import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import useAuth from "../hooks/useAuth";

// Layouts and Navigation
import HeaderNav from "../components/home/HeaderNav";

// Public Pages
import Home from "../pages/home/Home";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import AboutUs from "../components/about/AboutUs";
import ContactUs from "../components/contact/ContactUs";
import CourseSuccess from "../components/courses/CourseSuccess";
import SeeAllCoursesList from "../pages/courses/AllCourses";
import CourseDetail from "../pages/courses/CourseDetails";
import ReadAllBlogs from "../pages/blogs/AllBlogs";
import Help from "../pages/help/Help";
import NotFound from "../pages/home/NotFound";
import TermsAndConditions from "../components/terms-and-conditions/TermsAndConditions";
import PrivacyPolicy from "../components/privacy-policy/PrivacyPolicy";
import SeeAllEduZoneBenefits from "../components/home/AllBenefits";

// Admin Pages
import AdminDashboard from "../admin/dashboard/Dashboard";
import StudentsListPage from "../admin/pages/students/StudentsList";
import TeachersListPage from "../admin/pages/instructors/Instructors";
import AdminSettingsPage from "../admin/pages/profile/Settings";
import CreateBlogPage from "../admin/pages/blog/CreateBlog";
import UpdateBlogPage from "../admin/pages/blog/UpdateBlog";
import DeleteBlogPage from "../admin/pages/blog/DeleteBlog";
import BlogListPage from "../admin/pages/blog/BlogsList";
import CreateCoursePage from "../admin/pages/courses/CreateCourse";
import UpdateCoursePage from "../admin/pages/courses/UpdateCourse";
import DeleteCoursePage from "../admin/pages/courses/DeleteCourse";
import CoursesListPage from "../admin/pages/courses/CoursesList";
import UserProfilePage from "../admin/components/shared/UserProfilePage";

// Instructor Pages
import InstructorDashboard from "../instructor/dashboard/Dashboard";

// Student Pages
import LearningRoom from "../pages/learning-room/LearningRoom";
import ContinueLearning from "../components/learning-room/ContinueLearning";

// Route Protection
import ProtectedRouteWrapper from "../routes/ProtectedRoutes";
import RoleProtectedRouteWrapper from "../routes/RoleProtectedRoutes";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const { isAuthenticated, user_type } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const HIDE_NAVBAR_PATHS = [
    "/login",
    "/signup",
    "/coursesuccess",
    "/notfound",
  ];
  const hideNavbar = HIDE_NAVBAR_PATHS.includes(location.pathname);

  const role = user?.user_type;

  return (
    <>
      {!hideNavbar && <HeaderNav />}
      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate
                to={`/${
                  user_type === "student" ? "user" : user_type
                }/dashboard-page`}
              />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate
                to={`/${
                  user_type === "student" ? "user" : user_type
                }/dashboard-page`}
              />
            ) : (
              <SignUpPage />
            )
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/courses/courses-list" element={<SeeAllCoursesList />} />
        <Route path="/see-all-benefits" element={<SeeAllEduZoneBenefits />} />
        <Route path="/help" element={<Help />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/allblogs" element={<ReadAllBlogs />} />

        <Route
          path="/courses/course-details/course/:id"
          element={<CourseDetail />}
        />
        <Route path="/coursesuccess" element={<CourseSuccess />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRouteWrapper />}>
          <Route path="/contact" element={<ContactUs />} />

          {/* Admin Only */}
          <Route
            element={<RoleProtectedRouteWrapper allowedRoles={["admin"]} />}
          >
            <Route path="/admin/dashboard-page" element={<AdminDashboard />} />
            <Route
              path="/admin/get-all-students"
              element={<StudentsListPage />}
            />
            <Route path="/admin/students/:id" element={<UserProfilePage />} />
            <Route
              path="/admin/get-all-instructors"
              element={<TeachersListPage />}
            />
            <Route
              path="/admin/instructors/:id"
              element={<UserProfilePage />}
            />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route
              path="/admin/blog/get-all-blogs"
              element={<BlogListPage />}
            />
            <Route path="/admin/blog/add-blog" element={<CreateBlogPage />} />
            <Route
              path="/admin/blog/update-blog/:id"
              element={<UpdateBlogPage />}
            />
            <Route
              path="/admin/blog/delete-blog/:id"
              element={<DeleteBlogPage />}
            />
          </Route>

          {/* Instructor Only */}
          <Route
            element={
              <RoleProtectedRouteWrapper allowedRoles={["instructor"]} />
            }
          >
            <Route
              path="/instructor/instructor-dashboard-page"
              element={<InstructorDashboard />}
            />
          </Route>

          {/* Shared Admin + Instructor */}
          {(role === "admin" || role === "instructor") && (
            <Route
              element={
                <RoleProtectedRouteWrapper
                  allowedRoles={["admin", "instructor"]}
                />
              }
            >
              <Route
                path={`/${role}/courses-management/get-all-courses`}
                element={<CoursesListPage />}
              />
              <Route
                path={`/${role}/courses-management/create-course`}
                element={<CreateCoursePage />}
              />
              <Route
                path={`/${role}/courses-management/update-course/:id`}
                element={<UpdateCoursePage />}
              />
              <Route
                path={`/${role}/courses-management/delete-course`}
                element={<DeleteCoursePage />}
              />
            </Route>
          )}

          {/* Student Only */}
          <Route
            element={<RoleProtectedRouteWrapper allowedRoles={["student"]} />}
          >
            <Route path="/user/learning-room" element={<LearningRoom />} />
            <Route
              path="/user/continue-learning"
              element={<ContinueLearning />}
            />
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
