import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlogThunk } from "../../../features/admin/blogSlice";
import { useNavigate } from "react-router-dom";

const CreateBlogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.blogs || {});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append(
      "tags",
      JSON.stringify(tags.split(",").map((t) => t.trim()))
    );
    if (image) formData.append("image", image);

    dispatch(createBlogThunk(formData)).then((res) => {
      if (!res.error) navigate("/admin/dashboard-page");
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Title"
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          required
          placeholder="Content"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          placeholder="Category"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
          placeholder="Tags (comma-separated)"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2 rounded"
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
        {error && (
          <p className="text-red-600 text-sm pt-2">❌ Error: {error}</p>
        )}
      </form>
    </div>
  );
};

export default CreateBlogPage;
