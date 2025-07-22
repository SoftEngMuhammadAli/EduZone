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

  const { blogs, loading, error } = useSelector((state) => state.blogs || {});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [blogLoaded, setBlogLoaded] = useState(false);
  const [image, setImage] = useState(null);

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
      setBlogLoaded(true);
    } else {
      setBlogLoaded(false);
    }
  }, [blogs, id]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
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
      JSON.stringify(tags.split(",").map((tag) => tag.trim()))
    );
    if (image) formData.append("image", image);

    dispatch(updateBlog({ id, blogData: formData })).then((res) => {
      if (!res.error) navigate("/admin/dashboard-page");
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id)).then((res) => {
        if (!res.error) navigate("/admin/dashboard-page");
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Update Blog</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : !blogLoaded ? (
        <p className="text-gray-600">No blog found with the given ID.</p>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
            placeholder="Title"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            required
            className="w-full px-4 py-2 border rounded"
            placeholder="Content"
          />

          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
            placeholder="Tags (comma-separated)"
          />

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
            placeholder="Category"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Delete Blog
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateBlogPage;
