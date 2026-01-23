import React from "react";
import { BookOpen, Users, Clock, Award, TrendingUp, Plus } from "lucide-react";

const AdminDashboardCourses = ({ courses = [], loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Course Management
            </h3>
            <p className="text-gray-600 text-sm">
              Manage and monitor all courses
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Course
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="p-6">
        {error ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-gray-600">Unable to load courses</p>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.slice(0, 4).map((course) => (
              <div
                key={course._id}
                className="group bg-gray-50 hover:bg-blue-50 rounded-2xl p-5 transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                {/* Course Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center flex-shrink-0">
                    {course.image ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${course.image}`}
                        alt={course.title}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    ) : (
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {course.description || "No description available"}
                    </p>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Level</div>
                    <div className="font-semibold text-gray-900">
                      {course.level || "All"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Students</div>
                    <div className="font-semibold text-gray-900 flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.students || 0}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Duration</div>
                    <div className="font-semibold text-gray-900">
                      {course.duration || "Flexible"}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Edit
                  </button>
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    View
                  </button>
                  <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    ...
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-700 mb-2">
              No Courses Created
            </h4>
            <p className="text-gray-500 text-sm">
              Start building your course catalog
            </p>
            <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all">
              Create First Course
            </button>
          </div>
        )}

        {/* View All Button */}
        {courses.length > 0 && (
          <button className="w-full mt-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            View All Courses ({courses.length})
            <TrendingUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardCourses;
