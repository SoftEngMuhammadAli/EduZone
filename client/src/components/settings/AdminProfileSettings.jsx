import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  getUserProfile,
  setUser,
} from "../../features/auth/userApiSlice";
import Sidebar from "../../components/settings/shared/Sidebar";
import {
  User,
  Mail,
  Calendar,
  Edit2,
  Save,
  X,
  Shield,
  Bell,
  Settings,
  Camera,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";

const AdminProfileSettings = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    location: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserProfile(user._id));
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "No bio added yet.",
        phone: user.phone || "",
        location: user.location || "",
      });
      // Set default avatar or user image
      setImagePreview(
        user.profileImage ||
          "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
      );
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setProfileImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user?._id) {
      toast.error("User not found");
      return;
    }

    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });
      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      const updatedUser = await dispatch(
        updateProfile({ userId: user._id, formData: data }),
      ).unwrap();

      dispatch(setUser(updatedUser));
      setIsEditing(false);
      setProfileImage(null);
      toast.success("✅ Profile updated successfully!");
    } catch (err) {
      toast.error("Update failed: " + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileImage(null);
    if (imagePreview && imagePreview.includes("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(
      user.profileImage ||
        "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
    );
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "No bio added yet.",
        phone: user.phone || "",
        location: user.location || "",
      });
    }
  };

  const getInitials = (name) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const renderProfileContent = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Profile Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your account information and preferences
          </p>
        </div>
        {isEditing ? (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-4xl font-bold">
              {imagePreview &&
              !imagePreview.includes("blob:") &&
              imagePreview !==
                "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                getInitials(formData.name)
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-2 right-2 p-2 bg-white text-gray-900 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center sm:text-left">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-2xl font-bold bg-transparent border-b border-white/30 focus:outline-none focus:border-white mb-2 w-full"
                placeholder="Your name"
              />
            ) : (
              <h2 className="text-2xl font-bold mb-2">{formData.name}</h2>
            )}

            <div className="flex items-center justify-center sm:justify-start gap-2 text-white/80 mb-3">
              <Mail className="w-4 h-4" />
              <span>{formData.email}</span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2 text-white/80">
              <Calendar className="w-4 h-4" />
              <span>
                Joined{" "}
                {new Date(
                  user?.registration_date || Date.now(),
                ).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {user?.user_type && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mt-4">
                <Shield className="w-3 h-3" />
                {user.user_type.charAt(0).toUpperCase() +
                  user.user_type.slice(1)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Details Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border ${
                  isEditing
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    : "border-gray-200 bg-gray-50"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                Email cannot be changed
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="+1 (555) 123-4567"
                className={`w-full px-4 py-3 rounded-xl border ${
                  isEditing
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    : "border-gray-200 bg-gray-50"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="City, Country"
                className={`w-full px-4 py-3 rounded-xl border ${
                  isEditing
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    : "border-gray-200 bg-gray-50"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Edit2 className="w-5 h-5 text-purple-600" />
              About You
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={8}
                placeholder="Tell us about yourself..."
                className={`w-full px-4 py-3 rounded-xl border resize-none ${
                  isEditing
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    : "border-gray-200 bg-gray-50"
                }`}
              />
              <p className="text-xs text-gray-500 mt-2">
                Brief description about yourself and your role
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOtherTabContent = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            {activeTab === "password" && (
              <Shield className="w-10 h-10 text-gray-400" />
            )}
            {activeTab === "notifications" && (
              <Bell className="w-10 h-10 text-gray-400" />
            )}
            {activeTab === "preferences" && (
              <Settings className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 capitalize">
            {activeTab} Settings
          </h2>
          <p className="text-gray-600 mb-8">
            {activeTab === "password" && "Manage your account security"}
            {activeTab === "notifications" &&
              "Control your notification preferences"}
            {activeTab === "preferences" && "Customize your experience"}
          </p>
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-gray-500">
              This feature is coming soon. We're working on bringing you more
              control over your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <main className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              {activeTab === "profile"
                ? renderProfileContent()
                : renderOtherTabContent()}
            </main>

            {/* Status Message */}
            {status === "failed" && error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-sm">⚠️ {error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileSettings;
