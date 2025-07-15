import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourse,
  fetchCourses,
} from "../../../features/admin/courseSlice";
import axiosInstance from "../../../services/axios";
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
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/courses/categories")
      .then((res) => setCategoryList(res.data.data));
  }, []);

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
    if (images[0]) {
      formData.append("image", images[0]);
    }

    dispatch(createCourse(formData)).then((res) => {
      if (!res.error) {
        dispatch(fetchCourses());
        if (user?.user_type === "admin") {
          navigate("/admin/dashboard-page");
        } else if (user?.user_type === "instructor") {
          navigate("/instructor/instructor-dashboard-page");
        } else {
          console.warn("Unknown user type:", user?.user_type);
        }
      } else {
        console.error("Course creation error:", res.error);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Create New Course</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            required
            className="w-full px-4 py-2 border rounded"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select a category</option>
            {categoryList.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium">Duration *</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            placeholder="e.g. 4 weeks"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium">Level *</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full bg-amber-100 rounded-lg mt-2 mb-2 p-5"
          />

          {previewImages.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-2">
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview-${index}`}
                  className="w-32 h-32 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>

        {error && <p className="text-red-600 text-sm pt-2">❌ {error}</p>}
      </form>
    </div>
  );
};

export default CreateCoursePage;
