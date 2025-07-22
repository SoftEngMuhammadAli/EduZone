import React from "react";

export const AppFooter = () => {
  return (
    <footer className="bg-[#1D2130] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">EDU-ZONE</h3>
            <p className="text-[#E5E5E5] text-sm leading-relaxed">
              Build and realize your dreams together with EduZone
            </p>
            <div className="space-y-2 text-sm text-[#E5E5E5]">
              <p className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:contact@website.com"
                  className="hover:underline"
                >
                  softeng.aliijaz@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a href="tel:+923028186660" className="hover:underline">
                  +92 302 8186660
                </a>
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Social Media</h4>
            <ul className="space-y-2 text-sm text-[#E5E5E5]">
              <li>
                <a href="#" className="hover:text-[#E1306C] transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1DA1F2] transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0077B5] transition">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-[#E5E5E5]">
              <li>
                <a href="#" className="hover:text-[#34A853] transition">
                  Independent Learning
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#EA4335] transition">
                  Entrepreneur
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-[#E5E5E5]">
              <li>
                <a href="#" className="hover:text-[#FBBC05] transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#4285F4] transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#34A853] transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#2B2E3C] pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-[#E5E5E5]">
          <p className="mb-4 md:mb-0">
            © Copyright EDUZONE 2025 - {new Date().getFullYear()}
          </p>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="hover:text-[#4285F4] transition">
              Home
            </a>
            <a href="#" className="hover:text-[#34A853] transition">
              About Us
            </a>
            <a href="#" className="hover:text-[#EA4335] transition">
              Courses
            </a>
            <a href="#" className="hover:text-[#FBBC05] transition">
              FAQ
            </a>
            <a href="#" className="hover:text-[#1DA1F2] transition">
              Blog
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
