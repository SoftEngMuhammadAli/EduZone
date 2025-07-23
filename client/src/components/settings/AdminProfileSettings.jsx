import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  getUserProfile,
} from "../../features/auth/userApiSlice";
import Sidebar from "../../components/settings/shared/Sidebar";
import ProfileForm from "../../components/settings/shared/ProfileForm";

const AdminProfileSettings = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getUserProfile(user._id));
    }
  }, [dispatch, user._id]);

  useEffect(() => {
    if (user?.name || user?.email || user?.bio) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(updateProfile({ userId: user._id, formData }))
      .unwrap()
      .then(() => {
        useEffect(() => {
          dispatch(getUserProfile(user._id));
          return () => {};
        }, []);
        alert("Profile updated!");
        setIsEditing(false);
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab="profile" setActiveTab={() => {}} />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#1C1E53] mb-6">
          Admin Profile
        </h1>

        <div className="bg-white shadow-md rounded-xl p-6 space-y-6 max-w-3xl">
          <div className="flex items-center gap-6">
            <img
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              alt="Admin Avatar"
              className="w-20 h-20 rounded-full border shadow-sm"
            />
            <div>
              <h2 className="text-xl font-semibold">{formData.name}</h2>
              <p className="text-gray-500">{formData.email}</p>
            </div>
          </div>

          <ProfileForm
            formData={formData}
            isEditing={isEditing}
            handleChange={handleChange}
          />

          <div className="flex items-center gap-4 mt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={status === "loading"}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
                >
                  {status === "loading" ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="border px-5 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
              >
                Edit Profile
              </button>
            )}
          </div>

          {status === "failed" && (
            <p className="text-red-500 mt-2">Error: {error}</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminProfileSettings;
