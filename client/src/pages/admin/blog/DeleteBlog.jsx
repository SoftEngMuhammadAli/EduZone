import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../../features/admin/blogSlice";

const DeleteBlogPage = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage & Delete Blogs</h1>

      {loading ? (
        <p>Loading blogs...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : !blogs || blogs.length === 0 ? (
        <p className="text-gray-600">No blogs found to delete.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-md shadow">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="px-4 py-3">Blog Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-t text-sm">
                  <td className="px-4 py-3">
                    {blog.image ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                          blog.image
                        }`}
                        alt="Blog"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{blog.title}</td>
                  <td className="px-4 py-3">{blog.category || "N/A"}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DeleteBlogPage;
