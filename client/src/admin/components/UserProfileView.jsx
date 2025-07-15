import React, { useState } from "react";
import axiosInstance from "../../services/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfileView = ({ user }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    user_type: user?.user_type || "student",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(
        `/api/users/${user._id}`,
        formData
      );
      setMsg("Profile updated successfully!");
      setErrorMsg("");
      setEditMode(false);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/api/users/${user._id}`);
      alert("User deleted successfully!");
      navigate(-1); // Go back to previous page
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete user.");
    }
  };

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-500">
        User data not available.
      </p>
    );

  return (
    <div className="bg-white rounded-xl p-6 shadow-md max-w-3xl mx-auto mt-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img
          src={
            user.profile_picture_url ||
            "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          }
          alt="Profile"
          className="w-28 h-28 rounded-full border"
        />
        <div className="text-center sm:text-left w-full">
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="text-2xl font-semibold border rounded px-2 py-1 w-full"
              />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="text-sm text-gray-600 mt-2 border rounded px-2 py-1 w-full"
              />
              {currentUser?.user_type === "admin" && (
                <select
                  name="user_type"
                  value={formData.user_type}
                  onChange={handleInputChange}
                  className="mt-2 px-2 py-1 border rounded"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              )}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-500 capitalize">{user.user_type}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </>
          )}
          <p className="text-sm text-gray-400 mt-1">
            Registered on:{" "}
            {new Date(user.registration_date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm text-gray-800">
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Bio</h3>
          {editMode ? (
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleInputChange}
              className="bg-gray-50 p-3 rounded-md w-full border"
            />
          ) : (
            <p className="bg-gray-50 p-3 rounded-md">
              {user.bio || "No bio provided."}
            </p>
          )}
        </div>
      </div>

      {msg && <p className="text-sm mt-3 text-green-600">{msg}</p>}
      {errorMsg && <p className="text-sm mt-3 text-red-600">{errorMsg}</p>}

      <div className="mt-5 flex flex-wrap gap-3">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}

        {currentUser?.user_type === "admin" && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete User
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfileView;
