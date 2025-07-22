import React, { useEffect } from "react";
import UserProfileCard from "../../../components/admin/UserProfileCard";
import EnrolledCoursesCard from "../../../components/app/learning-room/EnrolledCoursesCard";

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
