import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../hooks/useCustomHooks";
import { BASE_URL } from "../../../utils/constants";

const InstructorsListPage = () => {
  const navigate = useNavigate();

  const instructor = "instructor";

  const {
    data: allUsers,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/api/users/role/${instructor}`, "GET");

  const instructors = allUsers?.filter(
    (user) => user.user_type === "instructor"
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1C1E53] text-lg font-semibold">
        Loading instructors...
      </div>
    );
  }

  if (error || instructors.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1C1E53] text-lg font-semibold">
        {error || "No instructors available."}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 text-[#1C1E53]">
      <h1 className="text-2xl font-bold mb-6 text-center">Instructor's List</h1>
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
            {instructors.map((instructor) => (
              <tr
                key={instructor._id}
                className="border-t hover:bg-gray-100 cursor-pointer"
              >
                <td className="py-3 px-4">
                  <img
                    src={
                      instructor.profile_picture_url === null
                        ? "https://picsum.photos/400/150"
                        : instructor.profile_picture_url
                    }
                    alt={instructor.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-3 px-4">{instructor.name}</td>
                <td className="py-3 px-4">{instructor.email}</td>
                <td className="py-3 px-4">{instructor.bio}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() =>
                      navigate(`/admin/instructors/${instructor._id}`)
                    }
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

export default InstructorsListPage;
