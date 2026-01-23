import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  updateBlog,
  deleteBlog,
} from "../../../features/admin/blogSlice";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    blogs = [],
    loading,
    error,
  } = useSelector((state) => state.blogs || {});

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [blogLoaded, setBlogLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    const blog = blogs.find((b) => b._id === id);
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setTags((blog.tags || []).join(", "));
      setCategory(blog.category || "");
      setPreview(
        blog.image
          ? `${import.meta.env.VITE_BASE_URL}/uploads/${blog.image}`
          : null,
      );
      setBlogLoaded(true);
    }
  }, [blogs, id]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append(
      "tags",
      JSON.stringify(tags.split(",").map((t) => t.trim())),
    );
    if (image) formData.append("image", image);

    dispatch(updateBlog({ id, blogData: formData })).then((res) => {
      if (!res.error) navigate("/admin/dashboard-page");
    });
  };

  const handleDelete = () => {
    if (
      !window.confirm(
        "This action cannot be undone.\nAre you sure you want to delete this blog?",
      )
    )
      return;

    dispatch(deleteBlog(id)).then((res) => {
      if (!res.error) navigate("/admin/dashboard-page");
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-1">Update Blog</h1>
        <p className="text-sm text-gray-500 mb-6">
          Edit blog details or replace its image
        </p>

        {loading && <p className="text-gray-500">Loading blog...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && blogLoaded && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                rows="6"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>

            {/* Category + Tags */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full border px-4 py-2 rounded"
                  placeholder="react, node, backend"
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Blog Image
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded mb-3 border"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}

        {/* DANGER ZONE */}
        {!loading && blogLoaded && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-red-600 font-semibold mb-2">Danger Zone</h2>
            <p className="text-sm text-gray-500 mb-4">
              Deleting a blog is permanent and cannot be undone.
            </p>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete Blog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateBlogPage;
