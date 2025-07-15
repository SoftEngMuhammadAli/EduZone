import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import loginSideImage from "../../assets/images/auth/login-side-image.png";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (user.user_type === "admin") {
        navigate("/admin/dashboard-page");
      } else if (user.user_type === "instructor") {
        navigate("/instructor/instructor-dashboard-page");
      } else {
        navigate("/user/learning-room");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const credentials = {
      email: form.email.value,
      password: form.password.value,
    };

    if (!credentials) {
      console.error("Form data is empty");
      return;
    }

    if (!credentials.email || !credentials.password) {
      console.error("All fields are required");
      return;
    }

    await dispatch(login(credentials));
    form.reset();
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div
        className="hidden md:flex md:w-1/2 h-full bg-cover bg-center items-center justify-center p-8 md:p-16 text-white"
        style={{ backgroundImage: `url(${loginSideImage})` }}
      >
        <div className="bg-black bg-opacity-60 p-6 md:p-8 rounded-lg max-w-xl text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
            Step Closer to Your Dream with EduZone
          </h1>
          <p className="text-base md:text-lg">
            EduZone is your free and trusted E-Learning platform — designed to
            help you grow your skills, earn recognized certifications, and
            succeed in today’s competitive world.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-full bg-[#1C1E53] flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Login
          </h2>
          <p className="text-sm text-white mb-8">
            Please log in to your account
          </p>

          {error && <p className="text-red-400 mb-4">{error}</p>}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              className="w-full p-3 rounded bg-[#2D2F6B] text-white placeholder-gray-300 focus:outline-none"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              className="w-full p-3 rounded bg-[#2D2F6B] text-white placeholder-gray-300 focus:outline-none"
              required
            />

            <div className="flex items-center text-white text-sm">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember">Remember my credentials</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-yellow-400 text-[#000000] font-semibold rounded hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          <p className="text-sm text-white mt-6 text-center">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-yellow-400 underline hover:text-yellow-300"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
