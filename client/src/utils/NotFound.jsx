import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundImage from "../assets/images/main/error-page-svgrepo-com.svg";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] px-6 py-12 text-center">
      {/* Illustration */}
      <div className="w-56 h-56 mb-8">
        <img
          src={notFoundImage}
          alt="Page not found"
          className="w-full h-full rounded-xl object-contain animate-pulse"
        />
      </div>

      {/* Error Text */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600 mb-4 max-w-xl">
        The page you’re looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <p className="text-gray-500 mb-2 text-sm underline">
        Or maybe you don't have access.
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-[#2D2F6B] text-white font-medium rounded-md hover:bg-[#1c1d4f] transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
