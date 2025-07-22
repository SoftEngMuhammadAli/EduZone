import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../hooks/useCustomHooks";
import { BASE_URL } from "../../../utils/constants";

const StudentsListPage = () => {
  const navigate = useNavigate();

  const student = "student";

  const {
    data: allUsers,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/api/users/role/${student}`, "GET");

  const students = allUsers?.filter((user) => user.user_type === "student");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1C1E53] text-lg font-semibold">
        Loading Students...
      </div>
    );
  }

  if (error || !students || students.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1C1E53] text-lg font-semibold">
        {error || "No students available."}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 text-[#1C1E53]">
      <h1 className="text-2xl font-bold mb-6 text-center">Students List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-md">
          <thead className="bg-[#1C1E53] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Profile</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Bio</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student._id}
                className="border-t hover:bg-gray-100 cursor-pointer"
              >
                <td className="py-3 px-4">
                  <img
                    src={
                      student.profile_picture_url === null ||
                      !student.profile_picture_url
                        ? "https://picsum.photos/400/150"
                        : student.profile_picture_url
                    }
                    alt={student.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.email}</td>
                <td className="py-3 px-4">{student.bio}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => navigate(`/admin/students/${student._id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsListPage;
