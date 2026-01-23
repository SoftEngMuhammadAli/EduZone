import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  PlayCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Users,
  Award,
  Download,
  Menu,
  ChevronRight,
  Home,
  Star,
  Bookmark,
  Share2,
  Maximize2,
  Volume2,
  Settings,
} from "lucide-react";

const mockLessons = [
  {
    id: 1,
    title: "Introduction to Modern Web Development",
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    completed: true,
    duration: "15:30",
    description:
      "Learn the fundamentals and set up your development environment",
    type: "video",
  },
  {
    id: 2,
    title: "Setting up Development Environment",
    videoUrl: "https://www.youtube.com/embed/7wtfhZwyrcc",
    completed: true,
    duration: "22:45",
    description: "Configure tools and extensions for optimal workflow",
    type: "video",
  },
  {
    id: 3,
    title: "Building Your First Component",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    completed: false,
    duration: "18:20",
    description: "Create reusable components with modern frameworks",
    type: "video",
  },
  {
    id: 4,
    title: "State Management Fundamentals",
    videoUrl: "https://www.youtube.com/embed/TODO",
    completed: false,
    duration: "25:15",
    description: "Master state management patterns and best practices",
    type: "video",
  },
  {
    id: 5,
    title: "Advanced Debugging Techniques",
    videoUrl: "https://www.youtube.com/embed/TODO",
    completed: false,
    duration: "20:10",
    description: "Learn professional debugging and troubleshooting methods",
    type: "video",
  },
];

const ContinueLearning = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course || {};
  const [currentLessonIndex, setCurrentLessonIndex] = useState(2);
  const [lessons, setLessons] = useState(mockLessons);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const handleMarkComplete = () => {
    const updated = [...lessons];
    updated[currentLessonIndex].completed = true;
    setLessons(updated);
  };

  const nextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
    }
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prev) => prev - 1);
    }
  };

  const jumpToLesson = (index) => {
    setCurrentLessonIndex(index);
  };

  const currentLesson = lessons[currentLessonIndex];
  const progressPercentage =
    (lessons.filter((l) => l.completed).length / lessons.length) * 100;
  const completedLessons = lessons.filter((l) => l.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Course Navigation Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {course.title || "Course Title"}
                </h1>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>
                    Lesson {currentLessonIndex + 1} of {lessons.length}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {currentLesson.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Video Player */}
          <div
            className={`${isSidebarOpen ? "lg:w-2/3" : "w-full"} transition-all duration-300`}
          >
            {/* Video Player Container */}
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl mb-6">
              {/* Video Controls Overlay */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
                <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors">
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative w-full aspect-w-16 aspect-h-9">
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Video Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0">
                <div className="h-1 bg-gray-700">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{
                      width: `${((currentLessonIndex + 1) / lessons.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Lesson Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold rounded-full">
                      Lesson {currentLessonIndex + 1}
                    </span>
                    {currentLesson.completed && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {currentLesson.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {currentLesson.description}
                  </p>
                </div>
                <button className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Star className="w-5 h-5 text-yellow-500" />
                </button>
              </div>

              {/* Lesson Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Type</div>
                  <div className="font-semibold text-gray-900">
                    {currentLesson.type}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Duration</div>
                  <div className="font-semibold text-gray-900">
                    {currentLesson.duration}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <div
                    className={`font-semibold ${currentLesson.completed ? "text-green-600" : "text-yellow-600"}`}
                  >
                    {currentLesson.completed ? "Complete" : "In Progress"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Sequence</div>
                  <div className="font-semibold text-gray-900">
                    {currentLessonIndex + 1}/{lessons.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={prevLesson}
                disabled={currentLessonIndex === 0}
                className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-sm text-gray-500">Previous</div>
                  <div className="font-semibold text-gray-900">
                    {currentLessonIndex > 0
                      ? lessons[currentLessonIndex - 1].title
                      : "No previous lesson"}
                  </div>
                </div>
              </button>

              <div className="flex flex-col sm:flex-row gap-4 sm:w-auto">
                <button
                  onClick={handleMarkComplete}
                  className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    currentLesson.completed
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
                  }`}
                >
                  {currentLesson.completed ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Completed
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-5 h-5" />
                      Mark as Complete
                    </>
                  )}
                </button>

                <button
                  onClick={nextLesson}
                  disabled={currentLessonIndex === lessons.length - 1}
                  className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all duration-300"
                >
                  <div className="text-left">
                    <div className="text-sm text-gray-300">Next</div>
                    <div className="font-semibold">
                      {currentLessonIndex < lessons.length - 1
                        ? lessons[currentLessonIndex + 1].title
                        : "Course Complete"}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Course Progress Overview */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Course Progress
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Overall Progress</span>
                  <span className="font-bold text-blue-600">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>
                    {completedLessons} of {lessons.length} lessons completed
                  </span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Course Content */}
          <div
            className={`lg:w-1/3 transition-all duration-300 ${!isSidebarOpen && "hidden lg:block"}`}
          >
            <div className="sticky top-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Sidebar Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Course Content</h3>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>Total duration: 1h 42m</span>
                    <span className="mx-2">•</span>
                    <Users className="w-4 h-4" />
                    <span>5 modules</span>
                  </div>
                </div>

                {/* Lessons List */}
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  {lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      onClick={() => jumpToLesson(index)}
                      className={`group flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer ${
                        index === currentLessonIndex
                          ? "bg-blue-50 border-l-4 border-l-blue-500"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          lesson.completed
                            ? "bg-green-100 text-green-600"
                            : index === currentLessonIndex
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <div className="text-sm font-bold">{index + 1}</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-medium truncate ${
                            index === currentLessonIndex
                              ? "text-blue-700"
                              : "text-gray-900"
                          }`}
                        >
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </span>
                          {lesson.completed && (
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              Complete
                            </span>
                          )}
                        </div>
                      </div>
                      {index === currentLessonIndex && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  ))}
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {completedLessons}
                      </div>
                      <div className="text-xs text-gray-500">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {lessons.length}
                      </div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">1</div>
                      <div className="text-xs text-gray-500">Quizzes</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowQuizModal(true)}
                    className="w-full py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Award className="w-5 h-5" />
                    Take Quiz
                  </button>
                </div>
              </div>

              {/* Resources Section */}
              <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
                <div className="space-y-3">
                  {[
                    { name: "Course Slides", type: "PDF", size: "2.4 MB" },
                    { name: "Code Examples", type: "ZIP", size: "5.1 MB" },
                    { name: "Assignment File", type: "DOC", size: "1.8 MB" },
                  ].map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <div className="text-blue-600 font-bold">
                            {resource.type}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {resource.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {resource.size}
                          </div>
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
            <div className="text-center mb-6">
              <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Knowledge Check Quiz
              </h3>
              <p className="text-gray-600">
                Test your understanding of the course material
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 border border-gray-200 rounded-xl">
                <p className="font-medium text-gray-900 mb-3">
                  What is the main benefit of component-based architecture?
                </p>
                <div className="space-y-2">
                  {["Reusability", "Performance", "Security", "Simplicity"].map(
                    (option, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="quiz"
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowQuizModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContinueLearning;
