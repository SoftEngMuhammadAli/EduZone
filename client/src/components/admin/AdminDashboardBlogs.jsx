import React from "react";

const AdminDashboardBlogs = ({ blogs = [], loading, error }) => {
  if (loading) return <p>Loading blogs...</p>;

  return (
    <>
      <div className="flex flex-row justify-between items-center mt-8 mb-4">
        <h2 className="text-xl font-semibold">Blogs Overview</h2>
        <p
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
          onClick={() => {
            alert("Feature coming soon!");
          }}
        >
          See All Details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.length > 0 ? (
          blogs.slice(0, 6).map((blog) => (
            <div key={blog._id} className="bg-white p-4 rounded-xl shadow-md">
              <div className="w-full h-40 bg-gray-200 rounded mb-3 overflow-hidden flex items-center justify-center">
                {blog.image ? (
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                      blog.image
                    }`}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500">No Image</span>
                )}
              </div>
              <h3 className="text-base font-semibold truncate mb-1">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {blog.content}
              </p>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center col-span-full hover:bg-gray-100 p-4 rounded-lg cursor-pointer">
            <p className="text-gray-500 col-span-full text-center">
              No blogs available.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboardBlogs;
