import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../../features/admin/blogSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/common/Loader";
import ErrorBox from "../../../components/common/ErrorBox";

const BlogListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    blogs,
    loading: courseLoader,
    error: courseError,
  } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id)).then((res) => {
        if (!res.error) dispatch(fetchBlogs());
      });
    }
  };

  if (courseLoader) {
    return <Loader title={"Loading Blogs..."} />;
  }

  if (courseError) {
    return <ErrorBox message={courseError} />;
  }

  const getImageUrl = (blog) =>
    `${import.meta.env.VITE_BASE_URL}/uploads/${blog.image}`;

  const truncate = (text, limit = 120) =>
    text?.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">All Blogs</h1>

      {!courseLoader && blogs?.length === 0 && (
        <p className="text-gray-500">No blogs found.</p>
      )}

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid gap-4 md:hidden">
        {blogs?.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            {/* Header */}
            <div className="flex gap-3">
              {blog.image ? (
                <img
                  src={getImageUrl(blog)}
                  alt={blog.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                  No Image
                </div>
              )}

              <div className="flex-1">
                <h2 className="font-semibold leading-snug line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {blog.category || "Uncategorized"}
                </p>
              </div>
            </div>

            {/* Content */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {truncate(blog.content, 100)}
            </p>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => navigate(`/admin/blog/update-blog/${blog._id}`)}
                className="flex-1 bg-blue-600 text-white py-1.5 rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="flex-1 bg-red-600 text-white py-1.5 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white shadow rounded overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3 w-[40%]">Content</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs?.map((blog) => (
              <tr key={blog._id} className="border-t align-top">
                <td className="p-3">
                  {blog.image ? (
                    <img
                      src={getImageUrl(blog)}
                      alt={blog.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>

                <td className="p-3 font-medium">{blog.title}</td>
                <td className="p-3">{blog.category || "Uncategorized"}</td>

                <td className="p-3 text-gray-600">
                  <p className="line-clamp-3 leading-relaxed">{blog.content}</p>
                </td>

                <td className="p-3 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() =>
                      navigate(`/admin/blog/update-blog/${blog._id}`)
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
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
    </div>
  );
};

export default BlogListPage;
