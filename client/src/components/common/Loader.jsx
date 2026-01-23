import React from "react";

const Loader = ({ title }) => {
  return (
    <div className="flex flex-col justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      {title && <p className="mt-4 text-center text-gray-600">{title}</p>}
    </div>
  );
};

export default Loader;
