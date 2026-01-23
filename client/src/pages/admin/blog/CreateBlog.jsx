import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlogThunk } from "../../../features/admin/blogSlice";
import { useNavigate } from "react-router-dom";

const CreateBlogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.blogs || {});

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // ===== handlers =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("category", formData.category);
    data.append(
      "tags",
      JSON.stringify(formData.tags.split(",").map((t) => t.trim())),
    );
    if (image) data.append("image", image);

    dispatch(createBlogThunk(data)).then((res) => {
      if (!res.error) navigate("/admin/dashboard-page");
    });
  };

  return (
    <div className="max-w-5xl mx-auto my-12 p-4 sm:p-6">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-1">Create New Blog</h1>
        <p className="text-sm text-gray-500 mb-6">
          Write and publish a new blog post.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ===== GRID ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. How React Changed Frontend"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                placeholder="Tech, Design, AI..."
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1">Content *</label>
            <textarea
              rows={6}
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Write your blog content here..."
              className="w-full px-4 py-2 border rounded resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags *</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              required
              placeholder="react, javascript, frontend"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate tags with commas
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Blog Thumbnail
            </label>

            <div className="flex items-center gap-4">
              <label className="cursor-pointer px-4 py-2 border rounded bg-gray-50 hover:bg-gray-100">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded border"
                />
              )}
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Recommended size: 600×400px
            </p>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded font-medium
                         hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Blog..." : "Create Blog"}
            </button>

            {error && <p className="text-red-600 text-sm mt-3">❌ {error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPage;
