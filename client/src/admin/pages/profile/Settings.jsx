import React, { useState } from "react";

// Inline SVG icon components
const UserIcon = () => (
  <svg
    className="w-5 h-5 mr-3"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.121 17.804A4.992 4.992 0 0112 15c1.657 0 3.156.805 4.121 2.049M15 10a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const LockClosedIcon = () => (
  <svg
    className="w-5 h-5 mr-3"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zM16 11V7a4 4 0 00-8 0v4"
    />
  </svg>
);

const BellIcon = () => (
  <svg
    className="w-5 h-5 mr-3"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const CogIcon = () => (
  <svg
    className="w-5 h-5 mr-3"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 3a.75.75 0 01.75.75V5.4a8.27 8.27 0 012.5 0V3.75a.75.75 0 011.5 0V5.4a8.25 8.25 0 012.6 1.1l1.1-1.1a.75.75 0 111.06 1.06l-1.1 1.1a8.25 8.25 0 011.1 2.6h1.65a.75.75 0 010 1.5H20.6a8.25 8.25 0 01-1.1 2.6l1.1 1.1a.75.75 0 01-1.06 1.06l-1.1-1.1a8.27 8.27 0 01-2.6 1.1v1.65a.75.75 0 01-1.5 0V18.6a8.27 8.27 0 01-2.5 0v1.65a.75.75 0 01-1.5 0V18.6a8.25 8.25 0 01-2.6-1.1l-1.1 1.1a.75.75 0 01-1.06-1.06l1.1-1.1a8.25 8.25 0 01-1.1-2.6H3.75a.75.75 0 010-1.5H5.4a8.25 8.25 0 011.1-2.6l-1.1-1.1a.75.75 0 011.06-1.06l1.1 1.1A8.25 8.25 0 0112 5.4V3.75A.75.75 0 0112.75 3h-3z"
    />
  </svg>
);

// Tab config using icons
const tabs = [
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "password", label: "Password", icon: LockClosedIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon },
  { id: "preferences", label: "Preferences", icon: CogIcon },
];

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "admin@example.com",
    bio: "This is a short bio for the admin profile.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setIsEditing(false);
      alert("Settings updated!");
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
          <>
            <h1 className="text-3xl font-bold text-[#1C1E53] mb-6">
              Profile Settings
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-1">Full Name</label>
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
                  <label className="block font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-md resize-none ${
                      isEditing ? "bg-white" : "bg-gray-100"
                    }`}
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
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
          </>
        )}

        {activeTab === "password" && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Change Password</h1>
            <p className="text-gray-600">Password update form goes here...</p>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">
              Notification Settings
            </h1>
            <p className="text-gray-600">Notification preferences go here...</p>
          </div>
        )}

        {activeTab === "preferences" && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Preferences</h1>
            <p className="text-gray-600">Theme, language, and more settings.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminSettingsPage;
