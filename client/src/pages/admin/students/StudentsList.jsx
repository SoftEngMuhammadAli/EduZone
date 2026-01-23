import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../hooks/useCustomHooks";
import { BASE_URL } from "../../../utils/constants";
import Loader from "../../../components/common/Loader";
import ErrorBox from "../../../components/common/ErrorBox";

const StudentsListPage = () => {
  const navigate = useNavigate();
  const studentRole = "student";

  const {
    data: allUsers,
    loading: studentLoader,
    error: studentError,
  } = useFetchData(`${BASE_URL}/api/users/role/${studentRole}`, "GET");

  const students = allUsers?.filter((user) => user.user_type === "student");

  if (studentLoader) {
    return <Loader title="Loading students..." />;
  }

  if (studentError || !students?.length) {
    return <ErrorBox message={studentError || "No students found."} />;
  }

  const getAvatar = (student) =>
    student.profile_picture_url || "https://picsum.photos/100";

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center md:text-left">
        Students List
      </h1>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid gap-4 md:hidden">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-white rounded-lg shadow p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={getAvatar(student)}
                alt={student.name}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h2 className="font-semibold">{student.name}</h2>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>
            </div>

            {student.bio && (
              <p className="text-sm text-gray-600 line-clamp-3">
                {student.bio}
              </p>
            )}

            <button
              onClick={() => navigate(`/admin/students/${student._id}`)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Profile</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Bio</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={getAvatar(student)}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                <td className="p-3 font-medium">{student.name}</td>

                <td className="p-3 text-gray-600">{student.email}</td>

                <td className="p-3 text-gray-600 line-clamp-2 max-w-xs">
                  {student.bio || "—"}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => navigate(`/admin/students/${student._id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View
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
