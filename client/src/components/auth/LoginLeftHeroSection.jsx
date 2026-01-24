import React from "react";
import loginSideImage from "../../assets/images/auth/login-side-image.png";
import { User, Sparkles, CheckCircle } from "lucide-react";

const LoginLeftHeroSection = () => {
  return (
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
  );
};

export default LoginLeftHeroSection;
