import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCourse } from "../../../features/admin/courseSlice";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axios";

const UpdateCoursePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.course);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    level: "Beginner",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loadingCourse, setLoadingCourse] = useState(true);

  // ===== Fetch course =====
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/api/courses/${id}`);
        const course = res.data.data;

        setFormData({
          title: course.title || "",
          description: course.description || "",
          duration: course.duration || "",
          level: course.level || "Beginner",
          category: course.category || "",
        });

        if (course.image) {
          setPreview(
            course.imageUrl ||
              `${import.meta.env.VITE_BASE_URL}/uploads/${course.image}`,
          );
        }
      } catch (err) {
        console.error("Failed to load course", err);
      } finally {
        setLoadingCourse(false);
      }
    };

    fetchCourse();
  }, [id]);

  // ===== Handlers =====
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
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (image) data.append("image", image);

    dispatch(updateCourse({ id, courseData: data })).then((res) => {
      if (!res.error) navigate("/admin/dashboard-page");
    });
  };

  if (loadingCourse) {
    return <p className="text-center py-10 text-gray-500">Loading course...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto my-12 p-4 sm:p-6">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-1">Update Course</h1>
        <p className="text-sm text-gray-500 mb-6">
          Modify course details and save changes.
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
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium mb-1">Level *</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
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
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
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
                Change Image
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
              Leave unchanged to keep existing image
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
              {loading ? "Updating Course..." : "Update Course"}
            </button>

            {error && <p className="text-red-600 text-sm mt-3">❌ {error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoursePage;
