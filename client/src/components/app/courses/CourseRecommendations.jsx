import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../hooks/useCustomHooks";
import CourseCard from "../../../components/app/courses/CourseCard";

const CourseRecommendations = () => {
  const navigate = useNavigate();
  const { data: courses, loading, error } = useFetchData("/api/courses/");

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error || !courses?.length)
    return (
      <div className="text-center py-20 text-red-600">
        {error || "No courses available"}
      </div>
    );

  return (
    <section className="px-4 sm:px-8 md:px-16 py-10 max-w-screen-2xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold">Recommended Courses</h2>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/courses/courses-list")}
            className="bg-[#FCD980] hover:bg-[#F4C44F] text-gray-800 py-2 px-6 rounded-md transition"
          >
            See All Courses
          </button>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {courses.slice(0, 3).map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            buttonText="Enroll Now"
          />
        ))}
      </div>
    </section>
  );
};

export default CourseRecommendations;
