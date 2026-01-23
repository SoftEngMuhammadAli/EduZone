import React from "react";
import ContactUs from "../contact/ContactUs";
import { useLocation } from "react-router-dom";
import {
  Target,
  Users,
  Globe,
  Award,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const AboutUs = () => {
  const location = useLocation();

  const aboutData = {
    heading: "Why Choose EduZone",
    subheading: "Empowering Learners Across the Globe",
    description:
      "EduZone provides a platform for quality learning with industry-standard content, expert mentors, and hands-on projects. We are committed to delivering knowledge that drives success, fostering growth for students of all levels.",
  };

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Clear Learning Paths",
      description: "Structured curriculum designed for career success",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Community",
      description: "Learn alongside peers and industry professionals",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Accessibility",
      description: "Access courses from anywhere, anytime",
      gradient: "from-green-500 to-emerald-400",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certified Excellence",
      description: "Industry-recognized certifications",
      gradient: "from-orange-500 to-yellow-400",
    },
  ];

  const stats = [
    { value: "21K+", label: "Active Learners", color: "text-blue-600" },
    { value: "150+", label: "Courses", color: "text-purple-600" },
    { value: "98%", label: "Success Rate", color: "text-green-600" },
    { value: "24/7", label: "Support", color: "text-orange-600" },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>

        {/* Geometric patterns */}
        <div className="absolute top-0 left-0 w-64 h-64 border border-blue-100/50 rounded-3xl transform rotate-45 translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 border border-purple-100/50 rounded-3xl transform rotate-45 -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            PREMIUM EDUCATION PLATFORM
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-gray-900">Empowering</span>
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                Learners Worldwide
              </span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Transforming aspirations into achievements through innovative
            learning experiences that bridge the gap between ambition and
            expertise.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Features */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 text-blue-700 font-semibold mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              OUR DISTINCTIVE ADVANTAGES
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why <span className="text-blue-600">EduZone</span> Stands Out
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We don't just teach—we transform. Our platform combines
              cutting-edge technology with proven pedagogical approaches to
              create learning experiences that resonate, engage, and produce
              tangible results.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500"
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative">
            {/* Abstract Learning Illustration */}
            <div className="relative w-full aspect-square max-w-2xl mx-auto">
              {/* Central Orbit */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-4/5 h-4/5">
                  {/* Orbiting Elements */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-xl flex items-center justify-center animate-float">
                      <div className="text-2xl font-bold text-blue-600">EZ</div>
                    </div>
                  </div>

                  <div className="absolute top-1/2 -right-4 -translate-y-1/2">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-50 rounded-xl shadow-xl flex items-center justify-center animate-float-delayed">
                      <TrendingUp className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-50 rounded-xl shadow-xl flex items-center justify-center animate-float-delayed-2">
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                  </div>

                  <div className="absolute top-1/2 -left-4 -translate-y-1/2">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-50 rounded-xl shadow-xl flex items-center justify-center animate-float">
                      <Users className="w-8 h-8 text-orange-600" />
                    </div>
                  </div>

                  {/* Central Circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-white mb-2">
                        EZ
                      </div>
                      <div className="text-white/80 text-sm">EDU-ZONE</div>
                    </div>
                  </div>

                  {/* Connecting Lines */}
                  <div className="absolute inset-0 border-2 border-dashed border-blue-200/50 rounded-full"></div>
                </div>
              </div>

              {/* Decorative Dots */}
              <div className="absolute top-4 left-4 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute top-4 right-4 w-4 h-4 bg-purple-400 rounded-full animate-ping delay-300"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 bg-green-400 rounded-full animate-ping delay-700"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 bg-orange-400 rounded-full animate-ping delay-1000"></div>
            </div>

            {/* Floating Text Elements */}
            <div className="absolute -top-4 left-0 transform -translate-y-1/2">
              <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-100">
                <span className="text-sm font-semibold text-blue-600">
                  Innovative Learning
                </span>
              </div>
            </div>
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
              <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-100">
                <span className="text-sm font-semibold text-purple-600">
                  Career Growth
                </span>
              </div>
            </div>
            <div className="absolute -left-4 bottom-1/3 transform translate-y-1/2">
              <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-100">
                <span className="text-sm font-semibold text-green-600">
                  Skill Mastery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 text-center mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Begin Your Journey?
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of successful learners who have transformed their
            careers with EduZone. Your future starts here.
          </p>
          <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-10 rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-3">
              Start Learning Free Today
              <svg
                className="w-6 h-6 group-hover:translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Mission Statement */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-5xl text-gray-300 mb-6">"</div>
          <p className="text-2xl md:text-3xl text-gray-700 italic mb-8">
            Our mission is to democratize quality education, making world-class
            learning accessible to everyone, everywhere.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Contact Section Conditionally */}
      {location.pathname !== "/" && location.pathname !== "/home" && (
        <div className="mt-20">
          <ContactUs />
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 7s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-float-delayed-2 {
          animation: float 8s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
