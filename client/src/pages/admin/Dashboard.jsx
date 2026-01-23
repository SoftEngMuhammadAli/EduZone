import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/admin/courseSlice";
import useFetchData from "../../hooks/useCustomHooks";
import { BASE_URL } from "../../utils/constants";
import AdminSideBarNavigation from "../../components/admin/AdminSideBar";
import UserProfileCard from "../../components/admin/UserProfileCard";
import AdminDashboardStatsCards from "../../components/admin/AdminStatsCards";
import AdminDashboardCourses from "../../components/admin/AdminDashboardCourses";
import AdminDashboardBlogs from "../../components/admin/AdminDashboardBlogs";
import { DashboardCharts } from "../../components/admin/DashboardCharts";
import {
  Activity,
  TrendingUp,
  Users,
  BookOpen,
  FileText,
  Shield,
  Sparkles,
} from "lucide-react";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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

  // Mock data for charts
  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "Enrolled in course",
      time: "2 mins ago",
      icon: "👨‍🎓",
    },
    {
      id: 2,
      user: "Sarah Smith",
      action: "Completed lesson",
      time: "15 mins ago",
      icon: "✅",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "Uploaded assignment",
      time: "30 mins ago",
      icon: "📤",
    },
    {
      id: 4,
      user: "Emma Wilson",
      action: "Posted comment",
      time: "1 hour ago",
      icon: "💬",
    },
    {
      id: 5,
      user: "David Brown",
      action: "Created account",
      time: "2 hours ago",
      icon: "👤",
    },
  ];

  const systemMetrics = [
    { label: "Server Uptime", value: "99.9%", status: "healthy" },
    { label: "Response Time", value: "120ms", status: "good" },
    { label: "Active Sessions", value: "156", status: "normal" },
    { label: "API Usage", value: "78%", status: "warning" },
  ];

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
                <p className="text-gray-600 mt-2">
                  Here's what's happening with your platform today.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <Activity className="w-5 h-5 text-green-500 animate-pulse" />
                <span>
                  System Status:{" "}
                  <span className="font-semibold text-green-600">
                    All Systems Operational
                  </span>
                </span>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="text-xs text-gray-500 mb-1">
                  Today's Visitors
                </div>
                <div className="text-2xl font-bold text-gray-900">1,248</div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  +12.5%
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="text-xs text-gray-500 mb-1">Active Courses</div>
                <div className="text-2xl font-bold text-gray-900">
                  {coursesCount}
                </div>
                <div className="flex items-center gap-1 text-xs text-blue-600">
                  <BookOpen className="w-3 h-3" />
                  In Progress
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="text-xs text-gray-500 mb-1">
                  Platform Health
                </div>
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <Activity className="w-3 h-3" />
                  Optimal
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="text-xs text-gray-500 mb-1">Revenue Today</div>
                <div className="text-2xl font-bold text-gray-900">$2,845</div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  +8.2%
                </div>
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

              {/* Charts Section */}
              <DashboardCharts />

              {/* Courses Grid */}
              <AdminDashboardCourses
                courses={courses}
                loading={loading}
                error={error}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* System Metrics */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
                  <h3 className="text-xl font-bold mb-2">System Metrics</h3>
                  <p className="text-gray-300 text-sm">
                    Real-time platform performance
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  {systemMetrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">
                          {metric.value}
                        </span>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            metric.status === "healthy"
                              ? "bg-green-500"
                              : metric.status === "good"
                                ? "bg-blue-500"
                                : metric.status === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-gray-400"
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Recent Activities
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Latest user interactions
                  </p>
                </div>
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {activity.user}
                        </div>
                        <div className="text-sm text-gray-600">
                          {activity.action}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl shadow-xl border border-red-100 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Admin Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center">
                      <div className="text-2xl mb-2">👥</div>
                      <div className="text-sm font-medium text-gray-900">
                        Manage Users
                      </div>
                    </button>
                    <button className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center">
                      <div className="text-2xl mb-2">📊</div>
                      <div className="text-sm font-medium text-gray-900">
                        Analytics
                      </div>
                    </button>
                    <button className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center">
                      <div className="text-2xl mb-2">⚙️</div>
                      <div className="text-sm font-medium text-gray-900">
                        Settings
                      </div>
                    </button>
                    <button className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center">
                      <div className="text-2xl mb-2">🔒</div>
                      <div className="text-sm font-medium text-gray-900">
                        Security
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
