import React from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../../hooks/useCustomHooks";
import { BASE_URL } from "../../../utils/constants";
import UserProfileView from "../../admin/UserProfileView";

const UserProfilePage = () => {
  const { id } = useParams();
  const {
    data: user,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/api/users/${id}`, "GET");

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-red-600 text-center mt-20">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">User Profile</h1>
      <UserProfileView user={user} />
    </div>
  );
};

export default UserProfilePage;
