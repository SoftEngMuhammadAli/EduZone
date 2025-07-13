import React from "react";

const AdminDashboardStatsCards = ({
  studentsCount,
  instructorsCount,
  coursesCount,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h3 className="text-lg font-semibold">Students</h3>
        <p className="text-3xl font-bold text-blue-600">{studentsCount}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h3 className="text-lg font-semibold">Instructors</h3>
        <p className="text-3xl font-bold text-green-600">{instructorsCount}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h3 className="text-lg font-semibold">Courses</h3>
        <p className="text-3xl font-bold text-purple-600">{coursesCount}</p>
      </div>
    </div>
  );
};

export default AdminDashboardStatsCards;
