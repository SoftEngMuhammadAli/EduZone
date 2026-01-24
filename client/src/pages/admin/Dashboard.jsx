import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/admin/courseSlice";
import useFetchData from "../../hooks/useCustomHooks";
import { BASE_URL } from "../../utils/constants";
import UserProfileCard from "../../components/admin/UserProfileCard";
import AdminDashboardStatsCards from "../../components/admin/AdminStatsCards";
import AdminDashboardCourses from "../../components/admin/AdminDashboardCourses";
import AdminDashboardBlogs from "../../components/admin/AdminDashboardBlogs";
import { Activity, Shield } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.user_type === "admin";

  const { courses, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const { data: studentsData, loading: studentsLoading } = useFetchData(
    `${BASE_URL}/api/users/role/student`,
    "GET",
  );

  const { data: adminsData, loading: adminLoading } = useFetchData(
    `${BASE_URL}/api/users/role/admin`,
    "GET",
  );

  const { data: instructorsData, loading: instructorsLoading } = useFetchData(
    `${BASE_URL}/api/users/role/instructor`,
    "GET",
  );

  const {
    data: blogs,
    loading: blogsLoading,
    error: blogsError,
  } = useFetchData(`${BASE_URL}/api/blogs`, "GET");

  // Calculate counts
  const studentsCount = studentsLoading ? 0 : studentsData?.length || 0;
  const adminsCount = adminLoading ? 0 : adminsData?.length || 0;
  const instructorsCount = instructorsLoading
    ? 0
    : instructorsData?.length || 0;
  const blogsCount = blogsLoading ? 0 : blogs?.length || 0;
  const coursesCount = loading ? 0 : courses?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex flex-col lg:flex-row">
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 text-red-700 rounded-full text-sm font-semibold mb-2">
                  <Shield className="w-4 h-4" />
                  ADMIN DASHBOARD
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Welcome back,{" "}
                  <span className="text-red-600">{user?.name || "Admin"}</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* User Profile Card */}
              <UserProfileCard />

              {/* Statistics Cards */}
              <AdminDashboardStatsCards
                studentsCount={studentsCount}
                instructorsCount={instructorsCount}
                coursesCount={coursesCount}
                blogsCount={blogsCount}
                adminsCount={adminsCount}
              />

              {/* Courses Grid */}
              <AdminDashboardCourses
                courses={courses}
                loading={loading}
                error={error}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl shadow-xl border border-red-100 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Admin Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        navigate(
                          user.user_type === "admin"
                            ? "/admin/courses-management/get-all-courses"
                            : user.user_type === "instructor"
                              ? "/instructor/courses-management/get-all-courses"
                              : "/courses/courses-list",
                        );
                      }}
                      className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center"
                    >
                      <div className="text-2xl mb-2">📖</div>
                      <div className="text-sm font-medium text-gray-900">
                        Manage Courses
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        navigate(
                          user.user_type === "admin"
                            ? "/admin/blog/get-all-blogs"
                            : user.user_type === "instructor"
                              ? "#"
                              : "/view-all-blogs",
                        );
                      }}
                      className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center"
                    >
                      <div className="text-2xl mb-2">📝</div>
                      <div className="text-sm font-medium text-gray-900">
                        Manage Blogs
                      </div>
                    </button>
                    <button className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center">
                      <div className="text-2xl mb-2">👥</div>
                      <div className="text-sm font-medium text-gray-900">
                        Manage Students
                      </div>
                    </button>
                    <button className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center">
                      <div className="text-2xl mb-2">👨‍🏫</div>
                      <div className="text-sm font-medium text-gray-900">
                        Manage Instructors
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Blogs Preview */}
              <AdminDashboardBlogs
                blogs={blogs}
                loading={blogsLoading}
                error={blogsError}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-6 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold">EDU-ZONE Admin Panel</p>
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} • Secure Management System
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>Version 2.1.4</span>
            <span>•</span>
            <span>Last Updated: Today</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-green-400">
              <Activity className="w-3 h-3" />
              All Systems Go
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
