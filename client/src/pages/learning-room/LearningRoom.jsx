import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrolledCourses } from "../../features/course/enrollSlice";
import UserProfileCard from "../../admin/components/UserProfileCard";
import { useNavigate } from "react-router-dom";
import EnrolledCoursesCard from "../../components/learning-room/EnrolledCoursesCard";

const LearningRoom = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 p-4 md:p-8">
        {/* Profile Header */}
        <UserProfileCard />

        {/* Enrolled Courses cArd */}
        <EnrolledCoursesCard />
      </main>
    </div>
  );
};

export default LearningRoom;
