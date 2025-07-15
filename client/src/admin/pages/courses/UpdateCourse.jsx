import React, { useState, useEffect } from "react";
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

  const [loadingCourse, setLoadingCourse] = useState(true);

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
      } catch (err) {
        console.error("Failed to load course:", err);
      } finally {
        setLoadingCourse(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCourse({ id, courseData: formData })).then((res) => {
      if (!res.error) navigate("/admin/dashboard-page");
    });
  };

  if (loadingCourse)
    return <p className="text-center p-4">Loading course...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-6">Update Course</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
            placeholder="e.g. Programming, Design"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Updating..." : "Update Course"}
        </button>

        {error && <p className="text-red-600 text-sm pt-2">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateCoursePage;
