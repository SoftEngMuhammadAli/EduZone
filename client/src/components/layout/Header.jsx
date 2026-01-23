import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MoreVertical } from "lucide-react";
import { logout } from "../../features/auth/authSlice";

const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const isAdmin = user?.user_type === "admin";
  const isInstructor = user?.user_type === "instructor";
  const isStudent = user?.user_type === "student";

  // Scroll effect for header
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3 shadow-lg" : "bg-[#1C1E53] py-4"
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link
          to={
            isAdmin
              ? "/admin/dashboard-page"
              : isInstructor
                ? "/instructor/instructor-dashboard-page"
                : "/home"
          }
          className="text-2xl font-bold tracking-tight text-white hover:text-yellow-400 transition-colors"
        >
          EduZone
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none text-white hover:scale-110 transition-transform"
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
        <nav className="hidden md:flex gap-8 text-white/90 font-medium items-center">
          {isAdmin && (
            <>
              <Link
                to="/admin/dashboard-page"
                className="hover:text-yellow-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/get-all-students"
                className="hover:text-yellow-400 transition-colors"
              >
                Students
              </Link>
              <Link
                to="/admin/get-all-instructors"
                className="hover:text-yellow-400 transition-colors"
              >
                Instructors
              </Link>
            </>
          )}

          {isInstructor && (
            <>
              <Link
                to="/instructor/instructor-dashboard-page"
                className="hover:text-yellow-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/instructor/courses-management/get-all-courses"
                className="hover:text-yellow-400 transition-colors"
              >
                Courses
              </Link>
              <Link
                to="/instructor/settings"
                className="hover:text-yellow-400 transition-colors"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 transition-colors"
              >
                Sign Out
              </button>
            </>
          )}

          {isStudent && (
            <>
              <Link
                to="/home"
                className="hover:text-yellow-400 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/courses/courses-list"
                className="hover:text-yellow-400 transition-colors"
              >
                Courses
              </Link>
              <Link
                to="/user/learning-room"
                className="hover:text-yellow-400 transition-colors"
              >
                Learning
              </Link>
              <Link
                to="/contact"
                className="hover:text-yellow-400 transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/about"
                className="hover:text-yellow-400 transition-colors"
              >
                About
              </Link>
            </>
          )}

          {/* Dropdown */}
          <div className="relative group">
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-yellow-400 transition-colors p-1"
            >
              {/* If teacher Then Show Only LogOut Button */}
              {isInstructor ? null : <MoreVertical size={20} />}
            </button>

            {(showDropdown || false) /* group-hover logic could go here */ && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden animate-fade-in border border-gray-100 z-50">
                <Link
                  to={
                    isAdmin
                      ? "/admin/settings"
                      : isInstructor
                        ? "/instructor/settings"
                        : "/user/settings"
                  }
                  onClick={() => setShowDropdown(false)}
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 transition-colors"
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
            {isAdmin && (
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
                <Link to="/admin/settings" onClick={() => setIsMenuOpen(false)}>
                  Settings
                </Link>
              </>
            )}

            {isInstructor && (
              <>
                {" "}
                <Link to="/instructor/instructor-dashboard-page">
                  Dashboard
                </Link>
                <Link to="/instructor/courses-management/get-all-courses">
                  Courses
                </Link>
                <Link
                  to="/instructor/settings"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
              </>
            )}

            {isStudent && (
              <>
                <Link to="/home" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>

                <Link
                  to="/courses/courses-list"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  to="/user/learning-room"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Learning Room
                </Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <Link to="/user/settings" onClick={() => setIsMenuOpen(false)}>
                  Settings
                </Link>
                <Link to="/help" onClick={() => setIsMenuOpen(false)}>
                  Help
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="text-left w-full px-4 py-2 bg-white hover:bg-red-100 text-red-600 rounded"
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
