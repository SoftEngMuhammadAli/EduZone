import React from "react";

const AdminDashboardBlogs = ({ blogs, loading, error }) => {
  return (
    <div className="mt-12">
      <div className="flex flex-row justify-between items-center mt-8 mb-4">
        <h2 className="text-xl font-semibold">Blogs Overview</h2>
        <p
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
          onClick={() => {
            alert("See all Blogs coming soon!");
          }}
        >
          See All
        </p>
      </div>

      {loading ? (
        <p>Loading blogs...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : blogs?.length === 0 ? (
        <p className="text-gray-500">No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.slice(0, 6).map((blog) => (
            <div key={blog._id} className="bg-white p-4 rounded-xl shadow-md">
              <div className="w-full h-40 bg-gray-200 rounded mb-3 overflow-hidden">
                {blog.images?.[0] ? (
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                      blog.images[0]
                    }`}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500 flex items-center justify-center h-full">
                    No Image
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold truncate mb-1">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {blog.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboardBlogs;
