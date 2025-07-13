import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Course Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1C1E53]">
            Course: {course.title || "Course Title"}
          </h1>
          <p className="text-gray-600 mt-1 font-normal">
            {course.description || "No description."}
          </p>
        </div>

        {/* Video Player */}
        <div className="aspect-w-16 aspect-h-9 mb-6 bg-black rounded overflow-hidden">
          <iframe
            src={currentLesson.videoUrl}
            title={currentLesson.title}
            allowFullScreen
            className="min-h-screen w-full"
          />
        </div>

        {/* Lesson Title */}
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          {currentLesson.title}
        </h2>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4 mb-6">
          <button
            disabled={currentLessonIndex === 0}
            onClick={prevLesson}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            ← Previous
          </button>

          <button
            onClick={handleMarkComplete}
            className={`px-6 py-2 rounded ${
              currentLesson.completed ? "bg-green-400" : "bg-yellow-400"
            }`}
          >
            {currentLesson.completed ? "Completed" : "Mark as Complete"}
          </button>

          <button
            disabled={currentLessonIndex === lessons.length - 1}
            onClick={nextLesson}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Next →
          </button>
        </div>

        {/* Lessons Progress List */}
        <div className="mt-8">
          <h3 className="text-md font-semibold text-gray-600 mb-2">
            All Lessons
          </h3>
          <ul className="space-y-2">
            {lessons.map((lesson, index) => (
              <li
                key={lesson.id}
                className={`p-3 rounded border ${
                  index === currentLessonIndex ? "bg-blue-100" : "bg-white"
                }`}
              >
                <span className="font-medium">{lesson.title}</span>{" "}
                {lesson.completed && (
                  <span className="text-green-500 ml-2 text-sm">
                    ✓ Completed
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;
