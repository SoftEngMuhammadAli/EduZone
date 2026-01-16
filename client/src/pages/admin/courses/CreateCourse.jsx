import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourse,
  fetchCourses,
} from "../../../features/admin/courseSlice";
import { useNavigate } from "react-router-dom";

const CreateCoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImages([file]);
      setPreviewImages([URL.createObjectURL(file)]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("level", level);
    formData.append("category", category);
    if (images[0]) formData.append("image", images[0]);

    dispatch(createCourse(formData)).then((res) => {
      if (!res.error) {
        dispatch(fetchCourses());
        const type = user?.user_type;
        navigate(
          type === "admin"
            ? "/admin/dashboard-page"
            : "/instructor/instructor-dashboard-page",
        );
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Create New Course</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Title *</label>
          <input
            type="text"
            value={title}
            autoComplete="text"
            name="text"
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description *</label>
          <textarea
            value={description}
            autoComplete="description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            required
            className="w-full px-4 py-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Category *</label>
          <input
            type="text"
            value={category}
            autoComplete="category"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="e.g. Programming, Design"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Duration *</label>
          <input
            type="text"
            value={duration}
            autoComplete="duration"
            name="duration"
            onChange={(e) => setDuration(e.target.value)}
            required
            placeholder="e.g. 4 weeks"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Level *</label>
          <select
            value={level}
            autoComplete="level"
            name="level"
            onChange={(e) => setLevel(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            autoComplete="image"
            name="image"
            onChange={handleImageChange}
            className="w-full border mt-2 p-2 rounded"
          />
          {previewImages.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-2">
              {previewImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`preview-${i}`}
                  className="w-32 h-32 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>

        {error && <p className="text-red-600 text-sm pt-2">❌ {error}</p>}
      </form>
    </div>
  );
};

export default CreateCoursePage;
