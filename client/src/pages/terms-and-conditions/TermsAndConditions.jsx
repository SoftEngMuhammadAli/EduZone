import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="bg-[#1C1E53] text-white py-12 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold">Terms & Conditions</h1>
          <p className="text-sm md:text-base text-gray-300 mt-2 max-w-xl">
            Please read the following terms carefully before using EDU-ZONE.
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-8 text-gray-200 text-base leading-relaxed">
          <section>
            <h2 className="text-[#FCD980] font-semibold text-lg mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this platform, you agree to comply with
              these terms. If you do not agree, please refrain from using our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-[#FCD980] font-semibold text-lg mb-2">
              2. Modifications
            </h2>
            <p>
              EDU-ZONE reserves the right to change these terms at any time.
              Users are encouraged to review them regularly.
            </p>
          </section>

          <section>
            <h2 className="text-[#FCD980] font-semibold text-lg mb-2">
              3. User Responsibilities
            </h2>
            <p>
              You must use the platform responsibly and legally. Abuse or misuse
              may result in termination of access.
            </p>
          </section>

          <section>
            <h2 className="text-[#FCD980] font-semibold text-lg mb-2">
              4. Intellectual Property
            </h2>
            <p>
              All content is protected. Reproducing materials without written
              consent is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-[#FCD980] font-semibold text-lg mb-2">
              5. Limitation of Liability
            </h2>
            <p>
              We are not responsible for any damages resulting from use of our
              services. Use at your own risk.
            </p>
          </section>
        </div>

        <p className="text-sm text-gray-400 mt-10">
          Last updated: June 28, 2025
        </p>
      </div>
    </section>
  );
};

export default TermsAndConditions;
