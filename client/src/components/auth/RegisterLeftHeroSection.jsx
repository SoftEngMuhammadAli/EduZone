import React from "react";
import registerSideImage from "../../assets/images/auth/signup-side-image.png";
import { CheckCircle, Shield, Sparkles, Award, Users } from "lucide-react";

const RegisterLeftHeroSection = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-105"
        style={{ backgroundImage: `url(${registerSideImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full flex items-center justify-center p-12">
        <div className="max-w-xl text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            START YOUR JOURNEY
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Begin Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Learning Adventure
            </span>
          </h1>

          <p className="text-lg text-white/90 mb-8">
            Join thousands of learners who have transformed their careers with
            our expert-led courses and hands-on projects.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: Award,
                text: "Certified Courses",
                color: "text-yellow-300",
              },
              {
                icon: Users,
                text: "Community Access",
                color: "text-blue-300",
              },
              {
                icon: Shield,
                text: "Secure Platform",
                color: "text-green-300",
              },
              {
                icon: CheckCircle,
                text: "Flexible Learning",
                color: "text-purple-300",
              },
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center`}
                >
                  <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                </div>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
            <div>
              <div className="text-2xl font-bold mb-1">50K+</div>
              <div className="text-sm text-white/80">Students</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">4.8★</div>
              <div className="text-sm text-white/80">Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">98%</div>
              <div className="text-sm text-white/80">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLeftHeroSection;
