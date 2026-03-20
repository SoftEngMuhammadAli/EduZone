import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Activity, Shield } from "lucide-react";
import { fetchCourses } from "../../features/admin/courseSlice";
import { fetchBlogs } from "../../features/admin/blogSlice";
import { fetchAdminAnalytics } from "../../features/analytics/analyticsSlice";
import UserProfileCard from "../../components/admin/UserProfileCard";
import AdminDashboardStatsCards from "../../components/admin/AdminStatsCards";
import AdminDashboardCourses from "../../components/admin/AdminDashboardCourses";
import AdminDashboardBlogs from "../../components/admin/AdminDashboardBlogs";
import { DashboardCharts } from "../../components/admin/DashboardCharts";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { courses, loading, error } = useSelector((state) => state.course);
  const {
    blogs = [],
    loading: blogsLoading,
    error: blogsError,
  } = useSelector((state) => state.blogs);
  const { admin: adminAnalytics } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchBlogs());
    dispatch(fetchAdminAnalytics());
  }, [dispatch]);

  const counts = adminAnalytics?.counts || {};
  const trends = adminAnalytics?.trends || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex flex-col lg:flex-row">
        <main className="flex-1 p-4 md:p-6 lg:p-8">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <UserProfileCard />
              <AdminDashboardStatsCards
                studentsCount={counts.students || 0}
                instructorsCount={counts.instructors || 0}
                coursesCount={counts.courses || courses?.length || 0}
                blogsCount={counts.blogs || blogs?.length || 0}
                adminsCount={counts.admins || 0}
              />
              <DashboardCharts
                userTrend={trends.users || []}
                enrollmentTrend={trends.enrollments || []}
              />
              <AdminDashboardCourses
                courses={courses}
                loading={loading}
                error={error}
              />
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl shadow-xl border border-red-100 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Admin Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() =>
                        navigate("/admin/courses-management/get-all-courses")
                      }
                      className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center"
                    >
                      <div className="text-2xl mb-2">C</div>
                      <div className="text-sm font-medium text-gray-900">
                        Manage Courses
                      </div>
                    </button>
                    <button
                      onClick={() => navigate("/admin/blog/get-all-blogs")}
                      className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center"
                    >
                      <div className="text-2xl mb-2">B</div>
                      <div className="text-sm font-medium text-gray-900">
                        Manage Blogs
                      </div>
                    </button>
                    <button
                      onClick={() => navigate("/admin/get-all-students")}
                      className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center"
                    >
                      <div className="text-2xl mb-2">S</div>
                      <div className="text-sm font-medium text-gray-900">
                        Manage Students
                      </div>
                    </button>
                    <button
                      onClick={() => navigate("/admin/get-all-instructors")}
                      className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center"
                    >
                      <div className="text-2xl mb-2">I</div>
                      <div className="text-sm font-medium text-gray-900">
                        Manage Instructors
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <AdminDashboardBlogs
                blogs={blogs}
                loading={blogsLoading}
                error={blogsError}
              />
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-6 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold">EDU-ZONE Admin Panel</p>
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Secure Management System
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>Version 2.2.0</span>
            <span>•</span>
            <span>Live Analytics</span>
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
