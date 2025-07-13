import React from "react";
import alJazeera from "../../assets/logos/al_jazeera.png";
import dubaiFuture from "../../assets/logos/dubai_future.png";
import misk from "../../assets/logos/misk_foundation.png";
import qatar from "../../assets/logos/qatar_foundation.png";
import stc from "../../assets/logos/stc.png";

const TrustedBySection = () => {
  const partners = [
    { name: "Al Jazeera", logo: alJazeera },
    { name: "Qatar Foundation", logo: qatar },
    { name: "Dubai Future", logo: dubaiFuture },
    { name: "Misk Foundation", logo: misk },
    { name: "STC", logo: stc },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16 px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Trusted by Leading Organizations
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-xl">
        We collaborate with top institutions, foundations, and technology
        leaders across the Middle East to empower learners.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
        {partners.map((partner, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              title={partner.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedBySection;
