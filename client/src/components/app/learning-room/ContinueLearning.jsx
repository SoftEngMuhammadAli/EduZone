import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle, PlayCircle, ArrowLeft, ArrowRight } from "lucide-react";

const mockLessons = [
  {
    id: 1,
    title: "Introduction to Course",
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    completed: false,
  },
  {
    id: 2,
    title: "Setting up the Environment",
    videoUrl: "https://www.youtube.com/embed/7wtfhZwyrcc",
    completed: false,
  },
  {
    id: 3,
    title: "Building First Component",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    completed: false,
  },
];

const ContinueLearning = () => {
  const { state } = useLocation();
  const course = state?.course || {};
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessons, setLessons] = useState(mockLessons);

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

  const currentLesson = lessons[currentLessonIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Course Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1C1E53] mb-2">
            {course.title || "Course Title"}
          </h1>
          <p className="text-gray-600 text-lg">
            {course.description || "No description available."}
          </p>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg mb-6">
          <iframe
            src={currentLesson.videoUrl}
            title={currentLesson.title}
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Lesson Info and Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {currentLesson.title}
            </h2>
            <p className="text-sm text-gray-500">
              Lesson {currentLessonIndex + 1} of {lessons.length}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={prevLesson}
              disabled={currentLessonIndex === 0}
              className="flex items-center gap-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-40"
            >
              <ArrowLeft size={18} /> Prev
            </button>

            <button
              onClick={handleMarkComplete}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium ${
                currentLesson.completed
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {currentLesson.completed ? (
                <CheckCircle size={18} />
              ) : (
                <PlayCircle size={18} />
              )}
              {currentLesson.completed ? "Completed" : "Mark as Complete"}
            </button>

            <button
              onClick={nextLesson}
              disabled={currentLessonIndex === lessons.length - 1}
              className="flex items-center gap-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40"
            >
              Next <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Progress List */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Lessons Progress
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className={`flex items-center justify-between p-4 border rounded-lg shadow-sm ${
                  index === currentLessonIndex
                    ? "bg-blue-100 border-blue-400"
                    : "bg-white"
                }`}
              >
                <div>
                  <p className="font-medium text-gray-800">{lesson.title}</p>
                  <p className="text-sm text-gray-500">
                    {lesson.completed ? "Completed" : "Not Completed"}
                  </p>
                </div>
                {lesson.completed && (
                  <CheckCircle size={20} className="text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;
