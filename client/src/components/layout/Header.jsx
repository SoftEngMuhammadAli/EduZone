import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  X,
  Home,
  GraduationCap,
  Users,
  Award,
  BookOpen,
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  MessageSquare,
  BookOpenCheck,
} from "lucide-react";
import { logout } from "../../features/auth/authSlice";

const HeaderNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isAdmin = user?.user_type === "admin";
  const isInstructor = user?.user_type === "instructor";
  const isStudent = user?.user_type === "student";
  const userInitial = user?.name?.charAt(0) || "U";

  /* ------------------ Effects ------------------ */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".dropdown") && !e.target.closest(".notify")) {
        setDropdownOpen(false);
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  /* ------------------ Logout ------------------ */
  const handleLogout = async () => {
    setLoggingOut(true);
    await dispatch(logout());
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  /* ------------------ Nav Links ------------------ */
  const navLinks = isAdmin
    ? [
        { to: "/admin/dashboard-page", label: "Dashboard", icon: Home },
        {
          to: "/admin/courses-management/get-all-courses",
          label: "Courses",
          icon: BookOpenCheck,
        },
        { to: "/admin/get-all-students", label: "Students", icon: Users },
        {
          to: "/admin/get-all-instructors",
          label: "Instructors",
          icon: GraduationCap,
        },
        { to: "/admin/analytics", label: "Analytics", icon: Award },
      ]
    : isInstructor
      ? [
          {
            to: "/instructor/instructor-dashboard-page",
            label: "Dashboard",
            icon: Home,
          },
          {
            to: "/instructor/courses-management/get-all-courses",
            label: "Courses",
            icon: BookOpen,
          },
          { to: "/instructor/students", label: "Students", icon: Users },
          { to: "/instructor/analytics", label: "Analytics", icon: Award },
        ]
      : [
          { to: "/home", label: "Home", icon: Home },
          { to: "/courses/courses-list", label: "Courses", icon: BookOpen },
          { to: "/user/learning-room", label: "Learning", icon: GraduationCap },
          { to: "/user/certificates", label: "Certificates", icon: Award },
          { to: "/user/community", label: "Community", icon: Users },
          {
            to: "/about",
            label: "About",
            icon: Sparkles,
          },
          {
            to: "/contact",
            label: "Contact",
            icon: MessageSquare,
          },
        ];

  /* ================== RENDER ================== */
  return (
    <header
      className={`sticky top-0 z-50 h-16 md:h-20 transition-all ${
        scrolled
          ? "bg-white/95 backdrop-blur border-b shadow-sm"
          : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={
            isAdmin
              ? "/admin/dashboard-page"
              : isInstructor
                ? "/instructor/instructor-dashboard-page"
                : "/home"
          }
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
            EZ
          </div>
          <span
            className={`font-bold text-lg ${scrolled ? "text-gray-900" : "text-white"}`}
          >
            EDU-ZONE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
                location.pathname === to
                  ? scrolled
                    ? "bg-blue-50 text-blue-600"
                    : "bg-white/10 text-white"
                  : scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white/80 hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* User Dropdown */}
          <div className="relative dropdown bg-white/80 backdrop-blur-md rounded-xl">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold">
                {userInitial}
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {dropdownOpen && (
              <div
                className="
      absolute right-0 mt-2 w-60
      rounded-xl border border-gray-200
      bg-white shadow-lg
      overflow-hidden
      z-50
      animate-in fade-in zoom-in-95
    "
              >
                {/* Settings */}
                <Link
                  to={
                    isAdmin
                      ? "/admin/settings"
                      : isInstructor
                        ? "/instructor/settings"
                        : "/user/settings"
                  }
                  className="
        flex items-center gap-3
        px-4 py-3
        text-sm font-medium text-gray-700
        hover:bg-gray-100
        transition
      "
                >
                  <Settings className="w-4 h-4 text-gray-500" />
                  Settings
                </Link>

                {/* Help */}
                <Link
                  to="/help"
                  className="
        flex items-center gap-3
        px-4 py-3
        text-sm font-medium text-gray-700
        hover:bg-gray-100
        transition
      "
                >
                  <HelpCircle className="w-4 h-4 text-gray-500" />
                  Help
                </Link>

                {/* Divider */}
                <div className="my-1 h-px bg-gray-200" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="
        flex w-full items-center gap-3
        px-4 py-3
        text-sm font-medium
        text-red-600
        hover:bg-red-50
        transition
        disabled:opacity-60
        disabled:cursor-not-allowed
      "
                >
                  <LogOut className="w-4 h-4" />
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-xl ${scrolled ? "text-gray-700" : "text-white"}`}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-white overflow-y-auto z-40 animate-[slide-in_0.3s_ease-out]">
          <div className="p-4 space-y-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50"
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-4 rounded-xl text-red-600 hover:bg-red-50 w-full"
            >
              <LogOut /> Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slide-in {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }
  
  .animate-slide-in {
    animation: slide-in 0.3s ease-out;
  }
`;
document.head.appendChild(style);
