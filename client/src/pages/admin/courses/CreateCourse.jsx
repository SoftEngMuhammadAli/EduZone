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
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

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
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("level", level);
    formData.append("category", category);
    if (image) formData.append("image", image);

    dispatch(createCourse(formData)).then((res) => {
      if (!res.error) {
        dispatch(fetchCourses());
        navigate(
          user?.user_type === "admin"
            ? "/admin/dashboard-page"
            : "/instructor/instructor-dashboard-page",
        );
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-1">Create New Course</h1>
        <p className="text-sm text-gray-500 mb-6">
          Fill in the details below to publish a new course.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ====== GRID ====== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. React for Beginners"
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                placeholder="Programming, Design..."
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Duration *
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                placeholder="e.g. 4 weeks"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium mb-1">Level *</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description *
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Briefly describe what students will learn..."
              className="w-full px-4 py-2 border rounded resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Course Thumbnail
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
                  alt="preview"
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
              {loading ? "Creating Course..." : "Create Course"}
            </button>

            {error && <p className="text-red-600 text-sm mt-3">❌ {error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
