import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/admin/courseSlice";
import { getAllComments } from "../../features/post-interactions/commentSlice";

const AdminCourseDetailPage = () => {
  const dispatch = useDispatch();

  const { courses, loading: coursesLoading } = useSelector(
    (state) => state.course
  );
  const { comments, status: commentsStatus } = useSelector(
    (state) => state.comment
  );

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(getAllComments());
  }, [dispatch]);

  const getCommentsForCourse = (courseId) =>
    comments?.filter(
      (comment) => comment?.course?._id?.toString() === courseId?.toString()
    ) || [];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">All Courses & Comments</h1>

        {coursesLoading || commentsStatus === "loading" ? (
          <p>Loading...</p>
        ) : (
          courses.map((course) => {
            const courseComments = getCommentsForCourse(course._id);
            return (
              <div
                key={course._id}
                className="bg-white shadow-md p-6 rounded-lg mb-6"
              >
                <h2 className="text-xl font-semibold text-[#1C1E53] mb-2">
                  {course.title || "Untitled Course"}
                </h2>
                <p className="text-gray-600 mb-3">{course.description}</p>

                <div className="mt-4">
                  <h3 className="font-medium text-gray-800">Comments</h3>
                  {courseComments.length > 0 ? (
                    <div className="mt-2 space-y-4">
                      {courseComments.map((c) => (
                        <div
                          key={c._id}
                          className="bg-gray-100 p-3 rounded text-sm border border-gray-200"
                        >
                          <div className="font-semibold">
                            {c.user?.name || "Anonymous"}
                          </div>
                          <div>{c.text}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(c.createdAt).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">
                      No comments yet.
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
};

export default AdminCourseDetailPage;
