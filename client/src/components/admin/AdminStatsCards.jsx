import React from "react";
import {
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  Shield,
  TrendingUp,
  Activity,
} from "lucide-react";

const AdminDashboardStatsCards = ({
  studentsCount,
  instructorsCount,
  coursesCount,
  blogsCount,
  adminsCount,
}) => {
  const stats = [
    {
      label: "Total Students",
      value: studentsCount,
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      trend: "+12%",
      change: "positive",
    },
    {
      label: "Instructors",
      value: instructorsCount,
      icon: <GraduationCap className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      trend: "+8%",
      change: "positive",
    },
    {
      label: "Courses",
      value: coursesCount,
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      trend: "+15%",
      change: "positive",
    },
    {
      label: "Blog Posts",
      value: blogsCount,
      icon: <FileText className="w-6 h-6" />,
      color: "from-orange-500 to-yellow-500",
      trend: "+5%",
      change: "positive",
    },
    {
      label: "Admins",
      value: adminsCount,
      icon: <Shield className="w-6 h-6" />,
      color: "from-red-500 to-orange-500",
      trend: "+2%",
      change: "positive",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Platform Overview
          </h2>
          <p className="text-gray-600">
            Key metrics and statistics at a glance
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-600">
          <Activity className="w-4 h-4" />
          <span>All metrics growing</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-transparent"
          >
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
            ></div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                >
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.change === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  {stat.trend}
                </div>
              </div>

              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                    style={{ width: `${Math.min(stat.value * 10, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Hover Effect Border */}
            <div
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${stat.color} group-hover:w-full transition-all duration-700 rounded-t-full`}
            ></div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Avg. Engagement</div>
              <div className="text-2xl font-bold text-gray-900">78%</div>
            </div>
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Completion Rate</div>
              <div className="text-2xl font-bold text-gray-900">42%</div>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Satisfaction</div>
              <div className="text-2xl font-bold text-gray-900">4.8/5</div>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardStatsCards;
