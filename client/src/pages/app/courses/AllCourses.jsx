import React, { useEffect, useState } from "react";
import axiosInstance from "../../../services/axios";
import { AppFooter } from "../../../components/app/footer/Footer";
import CourseCard from "../../../components/app/courses/CourseCard";

const SeeAllCoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/api/courses/");
        setCourses(response.data?.data || []);
      } catch (error) {
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <section className="px-4 sm:px-8 md:px-16 py-10 max-w-screen-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">All Courses For You</h2>

        {loading && (
          <div className="text-center text-[#1C1E53] text-lg font-semibold py-10">
            Loading courses...
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 text-lg font-semibold py-10">
            {error}
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="text-center text-[#1C1E53] text-lg font-semibold py-10">
            No courses available.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 50).map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>
      <AppFooter />
    </>
  );
};

export default SeeAllCoursesList;
