import React from "react";
import { useSelector } from "react-redux";

const UserProfileCard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <p className="text-center text-gray-500">No user data found.</p>;
  }

  const isAdmin = user.user_type === "admin";
  const isStudent = user.user_type === "student";
  const isTeacher = user.user_type === "instructor";

  return (
    <div className="bg-white rounded-xl shadow-sm px-4 py-3 mb-6 flex flex-col sm:flex-row items-center sm:items-center">
      {/* Leading Avatar */}
      <img
        src={
          user?.profile_picture_url ||
          "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        }
        alt="profile"
        className="w-20 h-20 sm:w-12 sm:h-12 rounded-full mb-3 sm:mb-0 sm:mr-4"
      />

      {/* Title & Subtitle */}
      <div className="flex-1 text-center sm:text-left mb-2 sm:mb-0">
        <p className="text-base sm:text-sm text-gray-900 font-semibold">
          {user?.name || (isAdmin ? "Admin" : "Student")}
        </p>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      {/* Trailing Text / Role */}
      <div className="text-center sm:text-right">
        <span className="text-xs font-medium px-6 sm:px-10 py-2 bg-blue-100 text-blue-700 rounded-lg inline-block">
          {isAdmin
            ? "ADMIN"
            : isStudent
              ? "STUDENT"
              : isTeacher
                ? "INSTRUCTOR"
                : "UNKNOWN ROLE"}
        </span>
      </div>
    </div>
  );
};

export default UserProfileCard;
