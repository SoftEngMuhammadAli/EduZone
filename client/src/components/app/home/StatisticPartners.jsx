import React from "react";
import logoLorem from "/src/assets/icons/lorem.png";
import logoDitlance from "/src/assets/icons/ditlance.png";
import logoOwthest from "/src/assets/icons/owthest.png";
import logoNeovasi from "/src/assets/icons/neovasi.png";
import logoOnago from "/src/assets/icons/onago.png";

const StatisticPartners = () => {
  return (
    <section className="bg-[#EEF4FA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-2xl text-gray-600 w-full text-center mb-6">
          Our Records
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
          <div>
            <p className="text-4xl font-bold text-indigo-600">21,000+</p>
            <p className="mt-2 text-sm text-gray-500">Registered Students</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-indigo-600">100+</p>
            <p className="mt-2 text-sm text-gray-500">Instructors</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-indigo-600">150+</p>
            <p className="mt-2 text-sm text-gray-500">Free Courses</p>
          </div>
        </div>

        <p className="text-2xl text-gray-600 w-full text-center mb-6">
          Our Trusted Partners
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {[logoLorem, logoDitlance, logoOwthest, logoNeovasi, logoOnago].map(
            (logo, idx) => (
              <div
                key={idx}
                className="p-3 rounded flex items-center gap-2 bg-white"
              >
                <img src={logo} alt={`Partner ${idx}`} className="h-6 w-auto" />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default StatisticPartners;
