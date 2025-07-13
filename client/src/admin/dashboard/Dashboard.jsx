import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/admin/courseSlice";
import AdminProfileCard from "../components/UserProfileCard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1e2344] text-white p-6">
        <h1 className="text-2xl text-center font-bold mb-8">
          Admin Dashboard Management
        </h1>
        <nav className="space-y-6">
          <div className="mt-8 border-t border-white pt-4 space-y-2">
            <p className="text-sm uppercase text-gray-300">Blog Management</p>
            <div
              onClick={() => navigate("/admin/blog/get-all-blogs")}
              className="hover:text-yellow-400 cursor-pointer"
            >
              📄 Get All Blogs
            </div>
            <div
              onClick={() => navigate("/admin/blog/add-blog")}
              className="hover:text-yellow-400 cursor-pointer"
            >
              ➕ Create Blog
            </div>
            <div
              onClick={() => navigate("/admin/blog/update-blog/:id")}
              className="hover:text-yellow-400 cursor-pointer"
            >
              ✏️ Update Blog
            </div>
            <div
              onClick={() => navigate("/admin/blog/delete-blog/:id")}
              className="hover:text-yellow-400 cursor-pointer"
            >
              🗑️ Delete Blog
            </div>
          </div>

          <div className="mt-8 border-t border-white pt-4 space-y-2">
            <p className="text-sm uppercase text-gray-300">Course Management</p>
            <div
              onClick={() =>
                navigate("/admin/courses-management/get-all-courses")
              }
              className="hover:text-yellow-400 cursor-pointer"
            >
              📄 Get All Course
            </div>
            <div
              onClick={() =>
                navigate("/admin/courses-management/create-course")
              }
              className="hover:text-yellow-400 cursor-pointer"
            >
              ➕ Create Course
            </div>
            <div
              onClick={() =>
                navigate("/admin/courses-management/update-course")
              }
              className="hover:text-yellow-400 cursor-pointer"
            >
              ✏️ Update Course
            </div>
            <div
              onClick={() =>
                navigate("/admin/courses-management/delete-course")
              }
              className="hover:text-yellow-400 cursor-pointer"
            >
              🗑️ Delete Course
            </div>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8">
        <AdminProfileCard />

        {/* Overview + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Activity Overview</h2>
            <div className="flex items-end justify-between h-40">
              {[8, 5, 6, 3, 9, 4, 7, 3, 5, 6].map((val, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-3 rounded-md ${
                      val === 9 ? "bg-black" : "bg-purple-300"
                    }`}
                    style={{ height: `${val * 10}px` }}
                  ></div>
                  <span className="text-xs mt-1">{i + 1} Jan</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h2 className="font-semibold mb-4">Statistics</h2>
            <div className="relative w-24 h-24 mx-auto">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  className="text-gray-200"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.8"
                />
                <path
                  className="text-yellow-400"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.8"
                  strokeDasharray="65, 100"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                65%
              </span>
            </div>
            <p className="text-sm mt-2">Videos Watched</p>
          </div>
        </div>

        {/* Learning Activity Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <h2 className="font-semibold text-lg">Courses View</h2>
            <div className="flex gap-2 flex-wrap">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded px-3 py-1"
              />
              <button className="border rounded px-4 py-1">Category</button>
            </div>
          </div>

          {loading ? (
            <p>Loading courses...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : courses?.length === 0 ? (
            <p className="text-gray-500">No courses available.</p>
          ) : (
            <div className="space-y-4">
              {courses.slice(0, 6).map((course) => (
                <div
                  key={course._id}
                  className="bg-white p-4 rounded-xl shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-gray-300 rounded overflow-hidden flex items-center justify-center shrink-0">
                        {course.images?.[0] ? (
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                              course.images[0]
                            }`}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-500">
                            No Image
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm md:text-base">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-4">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 w-full md:w-1/3">
                      <button className="text-blue-600 text-sm">
                        More &gt;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
