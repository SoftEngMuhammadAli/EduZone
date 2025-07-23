import React from "react";

const ProfileForm = ({ formData, isEditing, handleChange }) => (
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
      <label className="block font-medium mb-1">Email Address</label>
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
);

export default ProfileForm;
