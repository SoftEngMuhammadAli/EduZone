import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../../features/admin/blogSlice";
import Loader from "../../../components/common/Loader";
import ErrorBox from "../../../components/common/ErrorBox";

const DeleteBlogPage = () => {
  const dispatch = useDispatch();
  const {
    blogs = [],
    loading: courseLoading,
    error: courseError,
  } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm("This action cannot be undone. Delete blog?")) return;
    dispatch(deleteBlog(id));
  };

  if (courseLoading) {
    return <Loader title="Loading Blogs..." />;
  }

  if (courseError) {
    return <ErrorBox message={courseError} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-red-600 mb-2">Delete Blogs</h1>
      <p className="text-sm text-gray-500 mb-6">
        Be careful. Deleted blogs cannot be recovered.
      </p>

      {!courseLoading && blogs.length === 0 && (
        <p className="text-gray-600">No blogs available.</p>
      )}

      {blogs.length > 0 && (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-t hover:bg-red-50 transition"
                >
                  <td className="p-3">
                    {blog.image ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${blog.image}`}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="p-3 font-medium">{blog.title}</td>
                  <td className="p-3">{blog.category || "N/A"}</td>
                  <td className="p-3 text-right">
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
