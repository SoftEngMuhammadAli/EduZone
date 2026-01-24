import React from "react";
import { useSelector } from "react-redux";
import { User, Mail, Crown, GraduationCap, Sparkles } from "lucide-react";

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
    },
    instructor: {
      label: "CERTIFIED INSTRUCTOR",
      gradient: "from-green-500 via-emerald-500 to-teal-400",
      icon: <GraduationCap className="w-6 h-6" />,
      accentColor: "text-green-600",
      bgAccent: "bg-green-50",
    },
    student: {
      label: "ACTIVE LEARNER",
      gradient: "from-blue-500 via-cyan-500 to-indigo-400",
      icon: <User className="w-6 h-6" />,
      accentColor: "text-blue-600",
      bgAccent: "bg-blue-50",
    },
  };

  const config = roleConfig[userType] || roleConfig.student;

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Profile Header - Role Specific */}
      <div
        className={`bg-linear-to-r ${config.gradient} p-8 text-white relative overflow-hidden`}
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
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
