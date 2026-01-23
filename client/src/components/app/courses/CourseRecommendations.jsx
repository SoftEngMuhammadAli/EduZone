import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../hooks/useCustomHooks";
import { TrendingUp, Sparkles } from "lucide-react";
import CourseCard from "../../common/CourseCard";

const CourseRecommendations = () => {
  const navigate = useNavigate();
  const { data: courses, loading, error } = useFetchData("/api/courses/");

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            FEATURED LEARNING PATHS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Recommended Courses
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handpicked by our experts to accelerate your learning journey and
            maximize your skill development.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin-reverse opacity-50"></div>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Discovering amazing courses...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-red-600"
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
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Unable to Load Courses
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We're having trouble loading the course recommendations. Please
              check your connection.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && !error && courses && courses.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {courses.slice(0, 3).map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  buttonText="Enroll Now"
                />
              ))}
            </div>

            {/* Stats Bar */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {courses.length}+
                  </div>
                  <p className="text-gray-700 font-medium">Total Courses</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {Math.max(...courses.map((c) => c.students || 0))}+
                  </div>
                  <p className="text-gray-700 font-medium">Max Enrollment</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    4.8
                  </div>
                  <p className="text-gray-700 font-medium">Avg. Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    100%
                  </div>
                  <p className="text-gray-700 font-medium">Satisfaction</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/courses/courses-list")}
                className="group relative bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold py-4 px-10 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <span className="relative flex items-center gap-3">
                  View All Courses
                  <TrendingUp className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </div>

            {/* Success Stories */}
            <div className="mt-20 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Join <span className="text-blue-600">21,000+</span> Successful
                Learners
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {["JS", "PY", "TS", "RE", "NG", "DJ"][i]}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {
                        [
                          "Web Dev",
                          "Data Science",
                          "Mobile",
                          "Cloud",
                          "AI",
                          "DevOps",
                        ][i]
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && (!courses || courses.length === 0) && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Courses Available
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We're currently updating our course catalog. New exciting courses
              are coming soon!
            </p>
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CourseRecommendations;
