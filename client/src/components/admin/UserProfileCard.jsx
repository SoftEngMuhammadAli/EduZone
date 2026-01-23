import React from "react";
import { useSelector } from "react-redux";
import {
  User,
  Mail,
  Award,
  Settings,
  TrendingUp,
  Shield,
  Users,
  BookOpen,
  BarChart3,
  Target,
  Clock,
  CheckCircle,
  Download,
  Star,
  Crown,
  GraduationCap,
  Activity,
  Sparkles,
} from "lucide-react";

const UserProfileCard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500">No user data found.</p>
      </div>
    );
  }

  const userType = user.user_type?.toLowerCase() || "student";
  const userInitial = user.name?.charAt(0) || user.email?.charAt(0) || "U";
  const userName = user.name || "User";

  // Role-based configurations
  const roleConfig = {
    admin: {
      label: "SYSTEM ADMINISTRATOR",
      gradient: "from-red-500 via-orange-500 to-amber-400",
      icon: <Crown className="w-6 h-6" />,
      accentColor: "text-red-600",
      bgAccent: "bg-red-50",
      stats: [
        {
          icon: <Users className="w-5 h-5" />,
          label: "Total Users",
          value: "0",
        },
        {
          icon: <BookOpen className="w-5 h-5" />,
          label: "Courses",
          value: "0",
        },
        {
          icon: <Shield className="w-5 h-5" />,
          label: "Active Sessions",
          value: "0",
        },
        {
          icon: <BarChart3 className="w-5 h-5" />,
          label: "Platform Health",
          value: "100%",
        },
      ],
      actionButtons: [
        { icon: <Settings className="w-5 h-5" />, label: "System Settings" },
        { icon: <Shield className="w-5 h-5" />, label: "Security" },
        { icon: <BarChart3 className="w-5 h-5" />, label: "Analytics" },
      ],
    },
    instructor: {
      label: "CERTIFIED INSTRUCTOR",
      gradient: "from-green-500 via-emerald-500 to-teal-400",
      icon: <GraduationCap className="w-6 h-6" />,
      accentColor: "text-green-600",
      bgAccent: "bg-green-50",
      stats: [
        { icon: <Users className="w-5 h-5" />, label: "Students", value: "0" },
        {
          icon: <BookOpen className="w-5 h-5" />,
          label: "Courses Created",
          value: "0",
        },
        {
          icon: <Star className="w-5 h-5" />,
          label: "Avg Rating",
          value: "0.0",
        },
        {
          icon: <Target className="w-5 h-5" />,
          label: "Completion Rate",
          value: "0%",
        },
      ],
      actionButtons: [
        { icon: <BookOpen className="w-5 h-5" />, label: "Create Course" },
        { icon: <Users className="w-5 h-5" />, label: "Manage Students" },
        { icon: <BarChart3 className="w-5 h-5" />, label: "Performance" },
      ],
    },
    student: {
      label: "ACTIVE LEARNER",
      gradient: "from-blue-500 via-cyan-500 to-indigo-400",
      icon: <User className="w-6 h-6" />,
      accentColor: "text-blue-600",
      bgAccent: "bg-blue-50",
      stats: [
        {
          icon: <BookOpen className="w-5 h-5" />,
          label: "Enrolled Courses",
          value: "0",
        },
        {
          icon: <CheckCircle className="w-5 h-5" />,
          label: "Completed",
          value: "0",
        },
        {
          icon: <Clock className="w-5 h-5" />,
          label: "Study Time",
          value: "0h",
        },
        {
          icon: <Award className="w-5 h-5" />,
          label: "Certificates",
          value: "0",
        },
      ],
      actionButtons: [
        { icon: <BookOpen className="w-5 h-5" />, label: "Browse Courses" },
        { icon: <Activity className="w-5 h-5" />, label: "Progress" },
        { icon: <Settings className="w-5 h-5" />, label: "Settings" },
      ],
    },
  };

  const config = roleConfig[userType] || roleConfig.student;

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Profile Header - Role Specific */}
      <div
        className={`bg-gradient-to-r ${config.gradient} p-8 text-white relative overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {userType === "admin" && (
            <div className="absolute top-0 left-0 w-64 h-64 border-4 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          )}
          {userType === "instructor" && (
            <div className="absolute bottom-0 right-0 w-64 h-64 border-4 border-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
          )}
          {userType === "student" && (
            <>
              <div className="absolute top-0 left-1/4 w-32 h-32 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-0 right-1/4 w-32 h-32 border-2 border-white rounded-full"></div>
            </>
          )}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* User Avatar with Role Badge */}
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
              {user.profile_picture_url ? (
                <img
                  src={user.profile_picture_url}
                  alt="Profile"
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <span className="text-4xl font-bold">{userInitial}</span>
              )}
            </div>
            <div
              className={`absolute -bottom-3 -right-3 w-16 h-16 rounded-2xl ${config.bgAccent} flex items-center justify-center shadow-xl border-2 border-white`}
            >
              <div className={config.accentColor}>{config.icon}</div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-3">
              <Sparkles className="w-4 h-4" />
              {config.label}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{userName}</h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-white/90 mb-4">
              <Mail className="w-5 h-5" />
              <span className="text-lg">{user.email}</span>
            </div>

            {/* Role Specific Info */}
            <div className="flex flex-wrap gap-3">
              {userType === "admin" && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  System Access Level: Full
                </span>
              )}
              {userType === "instructor" && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  Teaching Since: {new Date().getFullYear()}
                </span>
              )}
              {userType === "student" && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  Member Since: {new Date().getFullYear()}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons - Role Specific */}
          <div className="flex gap-3">
            {config.actionButtons.map((button, index) => (
              <button
                key={index}
                className="group flex flex-col items-center p-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
              >
                <div className="text-white mb-1 group-hover:scale-110 transition-transform">
                  {button.icon}
                </div>
                <span className="text-xs text-white/90">{button.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Role Specific Stats Section */}
      <div className="p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {config.stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl ${config.bgAccent} border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-2 rounded-xl ${config.accentColor.replace("text", "bg")} bg-opacity-20`}
                >
                  <div className={config.accentColor}>{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Role Specific Features */}
        <div
          className={`rounded-2xl p-6 ${config.bgAccent} border border-gray-100`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                {userType === "admin" && "System Overview"}
                {userType === "instructor" && "Teaching Analytics"}
                {userType === "student" && "Learning Progress"}
              </h4>
              <p className="text-sm text-gray-600">
                {userType === "admin" &&
                  "Monitor platform performance and user activity"}
                {userType === "instructor" &&
                  "Track student engagement and course performance"}
                {userType === "student" &&
                  "Your learning journey and achievements"}
              </p>
            </div>
            <TrendingUp className={`w-6 h-6 ${config.accentColor}`} />
          </div>

          {userType === "student" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Learning Streak</span>
                <span className="text-2xl font-bold text-orange-600">0 🔥</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full ${i < 0 ? "bg-orange-500" : "bg-gray-300"}`}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          )}

          {userType === "instructor" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Student Engagement</span>
                <span className="text-2xl font-bold text-green-600">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
          )}

          {userType === "admin" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Platform Uptime</span>
                <span className="text-2xl font-bold text-red-600">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Last 24h</span>
                <span>Last 7d</span>
                <span>Last 30d</span>
              </div>
            </div>
          )}
        </div>

        {/* Role Specific Quick Actions */}
        <div className="mt-6">
          <h5 className="font-semibold text-gray-900 mb-4">Quick Actions</h5>
          <div className="flex flex-wrap gap-3">
            {userType === "admin" && (
              <>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security Dashboard
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Manage Users
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  View Reports
                </button>
              </>
            )}
            {userType === "instructor" && (
              <>
                <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Create New Course
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  View Students
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Analytics
                </button>
              </>
            )}
            {userType === "student" && (
              <>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Browse Courses
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  View Certificates
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Account Settings
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
