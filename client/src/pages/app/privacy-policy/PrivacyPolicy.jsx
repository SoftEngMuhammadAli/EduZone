import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-white text-black py-12 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1E53]">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2 max-w-xl">
            Learn how EDU-ZONE collects, uses, and protects your data when you
            use our platform.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-700 text-base leading-relaxed">
          <section>
            <h2 className="text-[#1C1E53] font-semibold text-lg mb-2">
              1. Information We Collect
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
              erat vitae risus tincidunt luctus. Pellentesque non ante nec nulla
              tempor fermentum non sed mauris.
            </p>
          </section>

          <section>
            <h2 className="text-[#1C1E53] font-semibold text-lg mb-2">
              2. How We Use Information
            </h2>
            <p>
              Fusce porttitor nisl sit amet odio interdum, non ultricies sapien
              rhoncus. Nullam fringilla tincidunt fermentum. Sed eu urna et
              ligula ullamcorper placerat.
            </p>
          </section>

          <section>
            <h2 className="text-[#1C1E53] font-semibold text-lg mb-2">
              3. Data Sharing & Disclosure
            </h2>
            <p>
              Etiam ac purus non urna dignissim posuere. Nunc porta fermentum
              fringilla. Proin sed leo at lorem dapibus commodo eget vitae
              risus.
            </p>
          </section>

          <section>
            <h2 className="text-[#1C1E53] font-semibold text-lg mb-2">
              4. Cookies & Tracking
            </h2>
            <p>
              Curabitur at tincidunt risus. Phasellus euismod magna nec arcu
              bibendum, ac fringilla velit pretium. Aenean tristique lorem at
              arcu luctus, at tincidunt sapien feugiat.
            </p>
          </section>

          <section>
            <h2 className="text-[#1C1E53] font-semibold text-lg mb-2">
              5. Your Rights
            </h2>
            <p>
              Integer faucibus risus in leo tincidunt, nec suscipit ipsum
              tristique. Sed rutrum lorem in erat varius, at aliquam massa
              elementum.
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

export default PrivacyPolicy;
