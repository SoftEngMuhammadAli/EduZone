import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  getUserProfile,
  setUser,
} from "../../features/auth/userApiSlice";
import Sidebar from "../../components/settings/shared/Sidebar";

const AdminProfileSettings = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({ name: "", email: "", bio: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?._id) dispatch(getUserProfile(user._id));
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!user?._id) return;

    setSaving(true);
    try {
      const updatedUser = await dispatch(
        updateProfile({ userId: user._id, formData }),
      ).unwrap();
      dispatch(setUser(updatedUser));
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Update failed: " + err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        {activeTab === "profile" && (
          <div className="space-y-6 max-w-4xl bg-white p-6 rounded-xl shadow-md mx-auto">
            <h1 className="text-2xl font-bold text-[#1C1E53] mb-4">
              Admin Profile
            </h1>

            {/* Profile Info */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
              <img
                src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                alt="Admin Avatar"
                className="w-24 h-24 rounded-full border shadow-sm"
              />
              <div className="text-center sm:text-left flex-1">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="text-xl font-semibold w-full px-3 py-2 border rounded-md mb-2"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-500"
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">{formData.name}</h2>
                    <p className="text-gray-500">{formData.email}</p>
                  </>
                )}
                <p className="text-sm text-gray-400 mt-1">
                  Registered:{" "}
                  {new Date(user.registration_date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-md ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-md resize-none ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
                  >
                    {saving ? "Saving..." : "Save Changes"}
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
        )}

        {["password", "notifications", "preferences"].includes(activeTab) && (
          <div className="max-w-4xl bg-white p-6 rounded-xl shadow-md mx-auto">
            <h2 className="text-xl font-semibold capitalize">
              {activeTab} Settings
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Feature not implemented yet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProfileSettings;
