import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import loginSideImage from "../../assets/images/auth/login-side-image.png";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowRight,
  Shield,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (user) {
      toast.success(`Welcome back, ${user.name}!`);
      if (user.user_type === "admin") {
        navigate("/admin/dashboard-page");
      } else if (user.user_type === "instructor") {
        navigate("/instructor/instructor-dashboard-page");
      } else {
        navigate("/user/learning-room");
      }
    }
  }, [user, navigate]);

  const validateForm = (email, password) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const credentials = {
      email: form.email.value.trim(),
      password: form.password.value,
    };

    const errors = validateForm(credentials.email, credentials.password);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", credentials.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    const result = await dispatch(login(credentials));

    if (login.fulfilled.match(result)) {
      toast.success("Login successful! Redirecting...");
    } else if (login.rejected.match(result)) {
      toast.error(
        result.payload || "Login failed. Please check your credentials.",
      );
    }

    form.reset();
  };

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      document.querySelector('input[name="email"]').value = rememberedEmail;
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: `url(${loginSideImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-transparent" />
        </div>

        <div className="relative z-10 w-full flex items-center justify-center p-12">
          <div className="max-w-xl text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              PREMIUM LEARNING PLATFORM
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Welcome Back to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                EduZone
              </span>
            </h1>

            <p className="text-lg text-white/90 mb-8">
              Continue your learning journey with personalized courses, expert
              instructors, and a community of passionate learners.
            </p>

            <div className="space-y-4">
              {[
                "Access 1000+ premium courses",
                "Track your learning progress",
                "Get personalized recommendations",
                "Join live Q&A sessions",
                "Earn verifiable certificates",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">
                    Join 50,000+ successful learners
                  </p>
                  <p className="text-sm text-white/80">Average rating: 4.8/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-300">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  required
                />
              </div>
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-400">{formErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <span className="text-gray-300 text-sm">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight
                    className={`w-5 h-5 transition-transform ${isHovered ? "translate-x-1" : ""}`}
                  />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-4 text-sm text-gray-400">Or continue with</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white hover:bg-gray-700/50 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white hover:bg-gray-700/50 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Create an account
              </button>
            </p>
            <p className="text-sm text-gray-500 mt-4">
              By signing in, you agree to our{" "}
              <button className="text-gray-400 hover:text-gray-300">
                Terms
              </button>{" "}
              and{" "}
              <button className="text-gray-400 hover:text-gray-300">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
