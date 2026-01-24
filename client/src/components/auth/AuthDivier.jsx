import React from "react";

const AuthDivier = ({ text }) => {
  return (
    <div className="flex items-center my-8">
      <div className="flex-1 h-px bg-gray-700"></div>
      <span className="px-4 text-sm text-gray-400">{text}</span>
      <div className="flex-1 h-px bg-gray-700"></div>
    </div>
  );
};

export default AuthDivier;
