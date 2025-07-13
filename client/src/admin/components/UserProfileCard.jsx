import React from "react";
import { useSelector } from "react-redux";

const UserProfileCard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <p className="text-center text-gray-500">No user data found.</p>;
  }

  const isAdmin = user.user_type === "admin";
  const isRegularUser = user.user_type === "user";

  return (
    <div>
      <div className="flex justify-start items-center gap-4 mb-6">
        <img
          src={
            user?.profile_picture_url ||
            "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          }
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <div className="text-left">
          <p className="text-sm text-gray-500">
            {user?.name || (isAdmin ? "Admin" : "User")}
          </p>
          <p className="font-semibold capitalize">
            {isAdmin ? "Admin" : isRegularUser ? "User" : "Unknown Role"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
