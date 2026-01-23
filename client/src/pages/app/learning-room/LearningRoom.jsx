import React, { useEffect } from "react";
import UserProfileCard from "../../../components/admin/UserProfileCard";
import EnrolledCoursesCard from "../../../components/app/learning-room/EnrolledCoursesCard";
import { Sparkles, TrendingUp, Award, BookOpen } from "lucide-react";

const LearningRoom = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border-4 border-white rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              WELCOME TO YOUR LEARNING SPACE
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your <span className="text-yellow-300">Personalized</span>{" "}
              Learning Journey
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Track your progress, continue your courses, and achieve your
              learning goals.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">0</div>
              <div className="text-white/80">Active Courses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">0</div>
              <div className="text-white/80">Hours Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">0</div>
              <div className="text-white/80">Achievements</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">0%</div>
              <div className="text-white/80">Overall Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* User Profile Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>Learning Analytics</span>
            </div>
          </div>
          <UserProfileCard />
        </div>

        {/* Learning Path Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Learning Path
              </h2>
              <p className="text-gray-600">
                Continue your journey towards mastery
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
              <BookOpen className="w-5 h-5" />
              Explore More Courses
            </button>
          </div>

          {/* Achievement Badges Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              "Beginner",
              "Consistent Learner",
              "Course Explorer",
              "Mastery",
            ].map((badge, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <div>
          <EnrolledCoursesCard />
        </div>

        {/* Learning Tips */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Learning Tips
              </h3>
              <ul className="space-y-3">
                {[
                  "Set daily learning goals to stay motivated",
                  "Take regular breaks for better retention",
                  "Join study groups for collaborative learning",
                  "Practice consistently to build mastery",
                ].map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">30min</div>
              <p className="text-gray-600">Recommended daily study time</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningRoom;
