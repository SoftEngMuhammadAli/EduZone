import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrolledCourses } from "../../../features/course/enrollSlice";
import { useNavigate } from "react-router-dom";
import {
  Play,
  Clock,
  Users,
  Award,
  TrendingUp,
  BookOpen,
  Loader2,
  Sparkles,
} from "lucide-react";

const EnrolledCoursesCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { status, courses = [], error } = useSelector((state) => state.enroll);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchEnrolledCourses(user._id));
    }
  }, [dispatch, user]);

  const gradientColors = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-green-500 to-emerald-400",
    "from-orange-500 to-yellow-400",
    "from-red-500 to-rose-400",
    "from-indigo-500 to-blue-400",
  ];

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin opacity-50"
            style={{ animationDirection: "reverse" }}
          ></div>
        </div>
        <p className="text-lg font-semibold text-gray-700">
          Loading Your Courses
        </p>
        <p className="text-gray-500 mt-2">
          Discovering your learning journey...
        </p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Unable to Load Courses
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {error ||
            "Unable to find enrolled courses. You may not have enrolled in any courses yet."}
        </p>
        <button
          onClick={() => user?._id && dispatch(fetchEnrolledCourses(user._id))}
          className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (status === "succeeded" && courses.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Courses Enrolled
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          You haven't enrolled in any courses yet. Start your learning journey
          by exploring our course catalog.
        </p>
        <button
          onClick={() => navigate("/courses/courses-list")}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
        >
          Browse Courses
        </button>
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Enrolled Courses
            </span>
          </h2>
          <p className="text-gray-600">
            Continue your learning journey and track your progress
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <TrendingUp className="w-5 h-5" />
          <span>{courses.length} courses in progress</span>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {courses.map((enroll, index) => {
          const course = enroll.courseId || {};
          const colorIndex = index % gradientColors.length;
          const progress = enroll.progress || 0;

          return (
            <div
              key={enroll._id}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-transparent"
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradientColors[colorIndex]} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
              ></div>

              {/* Course Header */}
              <div
                className={`h-40 relative overflow-hidden bg-gradient-to-br ${gradientColors[colorIndex]}`}
              >
                {/* Abstract Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-32 h-32 border-4 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 border-4 border-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
                </div>

                {/* Course Symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                    <div className="text-white text-2xl font-bold">
                      {course.title?.charAt(0) || "C"}
                    </div>
                  </div>
                </div>

                {/* Level Badge */}
                {course.level && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      {course.level}
                    </span>
                  </div>
                )}

                {/* Enrollment Date */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs text-white/90">
                    Enrolled:{" "}
                    {new Date(enroll.enrollmentDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Course Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-gray-800 transition-colors">
                  {course.title || "Untitled Course"}
                </h3>

                {/* Course Description */}
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-1">
                  {course.description || "No description available."}
                </p>

                {/* Course Stats */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {course.duration && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {course.duration}
                      </span>
                    </div>
                  )}
                  {course.students && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {course.students} students
                      </span>
                    </div>
                  )}
                </div>

                {/* Progress Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-semibold text-gray-700">
                      Learning Progress
                    </span>
                    <span className="font-bold text-blue-600">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${gradientColors[colorIndex].replace("from-", "bg-gradient-to-r from-")}`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      navigate("/user/continue-learning", {
                        state: { course: course },
                      })
                    }
                    className="group flex-1 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold py-3 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Continue Learning
                  </button>
                  {progress >= 100 && (
                    <button className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-400 flex items-center justify-center hover:shadow-lg transition-all">
                      <Award className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${gradientColors[colorIndex]} group-hover:w-full transition-all duration-700 rounded-t-full`}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Learning Stats */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {courses.reduce(
                (acc, course) => acc + (course.progress || 0),
                0,
              ) / Math.max(courses.length, 1)}
              %
            </div>
            <p className="text-gray-700 font-medium">Average Progress</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {courses.filter((c) => c.progress >= 100).length}
            </div>
            <p className="text-gray-700 font-medium">Courses Completed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {courses.length}
            </div>
            <p className="text-gray-700 font-medium">Total Enrolled</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {Math.max(...courses.map((c) => c.progress || 0))}%
            </div>
            <p className="text-gray-700 font-medium">Highest Progress</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnrolledCoursesCard;
