import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../hooks/useCustomHooks";

const EduZoneBenefits = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetchData("/api/benefits/all");

  return (
    <section className="bg-white text-center max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-10">
        Benefits of Joining EDUZONE E-Learning
      </h2>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/see-all-benefits")}
          className="px-6 py-2 rounded-md bg-[#F4F6FC] text-gray-800 font-semibold shadow hover:bg-[#2405F2] hover:text-white transition"
        >
          See all
        </button>
      </div>

      {loading && (
        <p className="text-center text-[#1C1E53]">Loading benefits...</p>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p className="text-center text-gray-600">No benefits found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {data.slice(0, 6).map((benefit, idx) => (
          <div
            key={benefit._id}
            className="rounded-[10px] bg-[#F4F6FC] p-6 sm:p-8 md:p-10"
          >
            <div className="flex justify-center items-center bg-[#2405F2] text-white rounded-md h-8 w-8 mb-4">
              {idx + 1}
            </div>
            <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
            <p className="text-gray-600 text-sm md:text-base">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EduZoneBenefits;
