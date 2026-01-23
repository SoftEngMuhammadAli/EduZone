import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Layouts and Navigation
import HeaderNav from "../components/layout/Header";

// Public Pages
import HomePage from "../pages/app/home/Home";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import AboutUs from "../components/app/about/AboutUs";
import ContactUs from "../components/app/contact/ContactUs";
import CourseSuccess from "../components/app/courses/CourseSuccess";
import SeeAllCoursesList from "../pages/app/courses/AllCourses";
import CourseDetail from "../pages/app/courses/CourseDetails";
import ReadAllBlogs from "../pages/app/blogs/AllBlogs";
import Help from "../pages/app/help/Help";
import NotFound from "../utils/NotFound";
import SeeAllEduZoneBenefits from "../components/app/home/AllBenefits";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import StudentsListPage from "../pages/admin/students/StudentsList";
import TeachersListPage from "../pages/admin/instructors/Instructors";
import CreateBlogPage from "../pages/admin/blog/CreateBlog";
import UpdateBlogPage from "../pages/admin/blog/UpdateBlog";
import DeleteBlogPage from "../pages/admin/blog/DeleteBlog";
import BlogListPage from "../pages/admin/blog/BlogsList";
import CreateCoursePage from "../pages/admin/courses/CreateCourse";
import UpdateCoursePage from "../pages/admin/courses/UpdateCourse";
import DeleteCoursePage from "../pages/admin/courses/DeleteCourse";
import CoursesListPage from "../pages/admin/courses/CoursesList";
import UserProfilePage from "../components/admin/shared/UserProfilePage";

// Instructor Pages
import InstructorDashboard from "../pages/instructor/Dashboard";

// Student Pages
import LearningRoom from "../pages/app/learning-room/LearningRoom";
import ContinueLearning from "../components/app/learning-room/ContinueLearning";

// Route Protection
import ProtectedRouteWrapper from "../routes/ProtectedRoutes";
import RoleProtectedRouteWrapper from "../routes/RoleProtectedRoutes";
import BlogsDetails from "../pages/app/blogs/BlogsDetails";
import AdminProfileSettings from "../components/settings/AdminProfileSettings";
import InstructorProfileSettings from "../components/settings/InstructorProfileSettings";
import StudentProfileSettings from "../components/settings/StudentProfileSettings";

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

  const HIDE_NAVBAR_PATHS = [
    "/login",
    "/signup",
    "/course-purchase-status",
    "/notfound",
  ];
  const hideNavbar = HIDE_NAVBAR_PATHS.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <HeaderNav />}
      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              user_type === "admin" ? (
                <Navigate to="/admin/dashboard-page" />
              ) : user_type === "instructor" ? (
                <Navigate to="/instructor/instructor-dashboard-page" />
              ) : (
                <Navigate to="/user/learning-room" />
              )
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              user_type === "admin" ? (
                <Navigate to="/admin/dashboard-page" />
              ) : user_type === "instructor" ? (
                <Navigate to="/instructor/instructor-dashboard-page" />
              ) : (
                <Navigate to="/user/learning-room" />
              )
            ) : (
              <SignUpPage />
            )
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/courses/courses-list" element={<SeeAllCoursesList />} />
        <Route path="/see-all-benefits" element={<SeeAllEduZoneBenefits />} />
        <Route path="/help" element={<Help />} />
        <Route path="/view-all-blogs" element={<ReadAllBlogs />} />
        <Route path="/view-blog-details/:id" element={<BlogsDetails />} />
        <Route
          path="/courses/course-details/course/:id"
          element={<CourseDetail />}
        />
        <Route path="/course-purchase-status" element={<CourseSuccess />} />

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

            <Route path="/admin/settings" element={<AdminProfileSettings />} />
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

            <Route
              path="/instructor/settings"
              element={<InstructorProfileSettings />}
            />
          </Route>

          {/* Shared Admin + Instructor Routes */}
          <Route
            element={
              <RoleProtectedRouteWrapper
                allowedRoles={["admin", "instructor"]}
              />
            }
          >
            {/* Admin */}
            <Route
              path="/admin/courses-management/get-all-courses"
              element={<CoursesListPage />}
            />
            <Route
              path="/admin/courses-management/create-course"
              element={<CreateCoursePage />}
            />
            <Route
              path="/admin/courses-management/update-course/:id"
              element={<UpdateCoursePage />}
            />
            <Route
              path="/admin/courses-management/delete-course"
              element={<DeleteCoursePage />}
            />
            {/* <Route path="/admin/courses" element={<AdminCourseDetailPage />} /> */}

            {/* Instructor */}
            <Route
              path="/instructor/courses-management/get-all-courses"
              element={<CoursesListPage />}
            />
            <Route
              path="/instructor/courses-management/create-course"
              element={<CreateCoursePage />}
            />
            <Route
              path="/instructor/courses-management/update-course/:id"
              element={<UpdateCoursePage />}
            />
            <Route
              path="/instructor/courses-management/delete-course"
              element={<DeleteCoursePage />}
            />
            {/* <Route
              path="/instructor/courses"
              element={<AdminCourseDetailPage />}
            /> */}
          </Route>

          {/* Student Only */}
          <Route
            element={<RoleProtectedRouteWrapper allowedRoles={["student"]} />}
          >
            <Route path="/user/learning-room" element={<LearningRoom />} />
            <Route
              path="/user/continue-learning"
              element={<ContinueLearning />}
            />
            <Route path="/user/settings" element={<StudentProfileSettings />} />
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
