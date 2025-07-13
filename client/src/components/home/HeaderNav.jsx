import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { MoreVertical } from "lucide-react";

const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setShowDropdown(false);
    setIsMenuOpen(false);
  };

  const isAdmin = user?.user_type === "admin";

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <header className="bg-[#1C1E53] text-white relative z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/home" className="text-2xl font-semibold underline">
          EduZone
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-white text-base items-center">
          {isAdmin ? (
            <>
              <Link to="/admin/dashboard-page">Dashboard</Link>
              <Link to="/admin/get-all-students">Manage Students</Link>
              <Link to="/admin/get-all-instructors">Manage Instructors</Link>
            </>
          ) : (
            <>
              <Link to="/home">Home</Link>
              <Link to="/seeAllCourses">Courses</Link>
              <Link to="/user/learning-room">Learning Room</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/about">About Us</Link>
              <Link to="/help">Help</Link>
            </>
          )}

          {/* Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-yellow-400"
            >
              <MoreVertical />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                <Link
                  to="/admin/settings"
                  onClick={() => setShowDropdown(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col gap-4 text-white text-base">
            {isAdmin ? (
              <>
                <Link
                  to="/admin/dashboard-page"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/get-all-students"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Students
                </Link>
                <Link
                  to="/admin/get-all-instructors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Instructors
                </Link>
              </>
            ) : (
              <>
                <Link to="/home" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/seeAllCourses" onClick={() => setIsMenuOpen(false)}>
                  Courses
                </Link>
                <Link
                  to="/user/learning-room"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Learning Room
                </Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Contact Us
                </Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                  About Us
                </Link>
                <Link to="/help" onClick={() => setIsMenuOpen(false)}>
                  Help
                </Link>
              </>
            )}
            <Link to="/admin/settings" onClick={() => setIsMenuOpen(false)}>
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="text-left w-full px-4 py-1 bg-white hover:bg-blue-600 text-black rounded"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
