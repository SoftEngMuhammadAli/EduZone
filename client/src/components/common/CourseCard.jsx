import React from "react";
import { Clock, Users, Video, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, buttonText = "Explore Course" }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!course?._id) return console.error("Course ID is missing");
    navigate(`/courses/course-details/course/${course._id}`);
  };

  const gradientColors = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-green-500 to-emerald-400",
    "from-orange-500 to-yellow-400",
    "from-red-500 to-rose-400",
    "from-indigo-500 to-blue-400",
  ];

  const courseIndex =
    parseInt(course._id?.slice(-1) || "0") % gradientColors.length;

  return (
    <div
      onClick={handleNavigate}
      className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100 hover:border-transparent"
    >
      {/* Gradient Overlay Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientColors[courseIndex]} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
      ></div>

      {/* Course Header */}
      <div className="h-48 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-32 h-32 border-4 border-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-4 border-purple-300 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Course Category Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${gradientColors[courseIndex]} text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm`}
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            {course.category?.name || course.category || "Uncategorized"}
          </span>
        </div>

        {/* Course Level Indicator */}
        <div className="absolute top-4 right-4">
          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-full shadow">
            {course.level || "All Levels"}
          </span>
        </div>

        {/* Central Course Symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradientColors[courseIndex]} shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500`}
          >
            <div className="text-white text-2xl font-bold">
              {course.title?.charAt(0) || "C"}
            </div>
          </div>
        </div>

        {/* Progress Indicator (if enrolled) */}
        {course.progress !== undefined && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
              <span className="text-white/90">Progress</span>
              <span className="text-white">{course.progress}%</span>
            </div>
            <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-1.5">
              <div
                className={`bg-gradient-to-r ${gradientColors[courseIndex]} h-1.5 rounded-full transition-all duration-500`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-gray-800 transition-colors">
          {course.title}
        </h3>

        {/* Course Description */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
          {course.description}
        </p>

        {/* Course Stats */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Duration</div>
              <div className="text-sm font-semibold text-gray-900">
                {course.duration || "Flexible"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <Video className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Videos</div>
              <div className="text-sm font-semibold text-gray-900">
                {course.videos || "N/A"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <Users className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Students</div>
              <div className="text-sm font-semibold text-gray-900">
                {course.students || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Rating (if available) */}
        {course.rating && (
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4">
                  {i < Math.floor(course.rating) ? (
                    <div className="text-yellow-400">★</div>
                  ) : (
                    <div className="text-gray-300">★</div>
                  )}
                </div>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {course.rating}
            </span>
            <span className="text-sm text-gray-500">
              ({course.reviews || 0} reviews)
            </span>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto">
          <button className="group relative w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold py-3 rounded-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${gradientColors[courseIndex]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            ></div>
            <span className="relative flex items-center justify-center gap-2">
              {buttonText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-700 rounded-t-full"></div>
    </div>
  );
};

export default CourseCard;
