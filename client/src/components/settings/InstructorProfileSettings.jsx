import React, { useState } from "react";

const InstructorProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "Instructor Joe",
    email: "instructor@example.com",
    bio: "Expert in React, Node, and course creation.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setIsEditing(false);
      alert("Profile updated!");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-4 py-6">
        <h2 className="text-xl font-semibold mb-6 text-[#1C1E53]">Settings</h2>
        <nav className="space-y-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center w-full px-3 py-2 rounded-md text-left hover:bg-blue-100 ${
                activeTab === id
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "profile" && (
          <div className="space-y-6 max-w-3xl bg-white p-6 rounded-xl shadow">
            <h1 className="text-2xl font-bold text-[#1C1E53]">
              Instructor Profile
            </h1>
            <div className="flex items-center gap-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Instructor Avatar"
                className="w-20 h-20 rounded-full border"
              />
              <div>
                <h2 className="text-xl font-semibold">{formData.name}</h2>
                <p className="text-gray-500">{formData.email}</p>
              </div>
            </div>
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

            <div className="flex gap-4 mt-4">
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
          </div>
        )}

        {activeTab === "password" && (
          <div>
            <h2 className="text-xl font-semibold">Change Password</h2>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Feature not implemented yet.
            </p>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h2 className="text-xl font-semibold">Notification Settings</h2>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Feature not implemented yet.
            </p>
          </div>
        )}

        {activeTab === "preferences" && (
          <div>
            <h2 className="text-xl font-semibold">Preferences</h2>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Feature not implemented yet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default InstructorProfileSettings;
