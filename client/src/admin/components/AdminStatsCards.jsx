import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";

const AdminDashboardStatsCards = ({
  studentsCount,
  instructorsCount,
  coursesCount,
  blogsCount,
  adminsCount,
}) => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user.user_type === "admin";

  if (!user || user.user_type === null) {
    return <Loader />;
  }

  return (
    <>
      {isAdmin ? (
        <>
          <div className="flex flex-row justify-between items-center mt-8 mb-4">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
              onClick={() => {
                alert("See all courses coming soon!");
              }}
            >
              See All
            </p>
          </div>

          {/* Responsive 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Students Card */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-all duration-200">
              <div className="text-sm text-gray-500 mb-1">Total</div>
              <h3 className="text-lg font-semibold mb-2">Students</h3>
              <p className="text-4xl font-bold text-blue-600">
                {studentsCount}
              </p>
            </div>

            {/* Instructors Card */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-all duration-200">
              <div className="text-sm text-gray-500 mb-1">Total</div>
              <h3 className="text-lg font-semibold mb-2">Instructors</h3>
              <p className="text-4xl font-bold text-green-600">
                {instructorsCount}
              </p>
            </div>

            {/* Courses Card */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-all duration-200">
              <div className="text-sm text-gray-500 mb-1">Total</div>
              <h3 className="text-lg font-semibold mb-2">Courses</h3>
              <p className="text-4xl font-bold text-purple-600">
                {coursesCount}
              </p>
            </div>

            {/* Blogs Card */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-all duration-200">
              <div className="text-sm text-gray-500 mb-1">Total</div>
              <h3 className="text-lg font-semibold mb-2">Blogs</h3>
              <p className="text-4xl font-bold text-yellow-600">{blogsCount}</p>
            </div>

            {/* Admins Count Card */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-all duration-200">
              <div className="text-sm text-gray-500 mb-1">Total</div>
              <h3 className="text-lg font-semibold mb-2">Admin</h3>
              <p className="text-4xl font-bold text-yellow-600">
                {adminsCount}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row justify-between items-center mt-8 mb-4">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
              onClick={() => {
                alert("See all courses coming soon!");
              }}
            >
              See All
            </p>
          </div>

          {/* Responsive 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Students Card */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-all duration-200">
              <div className="text-sm text-gray-500 mb-1">Total</div>
              <h3 className="text-lg font-semibold mb-2">Students</h3>
              <p className="text-4xl font-bold text-blue-600">
                {studentsCount}
              </p>
            </div>

            {/* Instructors Card */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-all duration-200">
              <div className="text-sm text-gray-500 mb-1">Total</div>
              <h3 className="text-lg font-semibold mb-2">Instructors</h3>
              <p className="text-4xl font-bold text-green-600">
                {instructorsCount}
              </p>
            </div>

            {/* Courses Card */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-all duration-200">
              <div className="text-sm text-gray-500 mb-1">Total</div>
              <h3 className="text-lg font-semibold mb-2">Courses</h3>
              <p className="text-4xl font-bold text-purple-600">
                {coursesCount}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminDashboardStatsCards;
