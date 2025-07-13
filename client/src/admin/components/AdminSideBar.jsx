import React from "react";
import { useNavigate } from "react-router-dom";

const AdminSideBarNavigation = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-full md:w-64 bg-[#1e2344] text-white p-6">
      <h1 className="text-2xl text-center font-bold mb-8">
        Admin Dashboard Management
      </h1>

      <nav className="space-y-6">
        {/* Course Management */}
        <div className="mt-8 border-t border-white pt-4 space-y-2">
          <p className="text-sm uppercase text-gray-300">Course Management</p>
          <div
            onClick={() =>
              navigate("/admin/courses-management/get-all-courses")
            }
            className="hover:text-yellow-400 cursor-pointer"
          >
            📄 Get All Courses
          </div>
          <div
            onClick={() => navigate("/admin/courses-management/create-course")}
            className="hover:text-yellow-400 cursor-pointer"
          >
            ➕ Create Course
          </div>
          <div
            onClick={() => navigate("/admin/courses-management/update-course")}
            className="hover:text-yellow-400 cursor-pointer"
          >
            ✏️ Update Course
          </div>
          <div
            onClick={() => navigate("/admin/courses-management/delete-course")}
            className="hover:text-yellow-400 cursor-pointer"
          >
            🗑️ Delete Course
          </div>
        </div>

        {/* Blog Management */}
        <div className="mt-8 border-t border-white pt-4 space-y-2">
          <p className="text-sm uppercase text-gray-300">Blog Management</p>
          <div
            onClick={() => navigate("/admin/blog/get-all-blogs")}
            className="hover:text-yellow-400 cursor-pointer"
          >
            📄 Get All Blogs
          </div>
          <div
            onClick={() => navigate("/admin/blog/add-blog")}
            className="hover:text-yellow-400 cursor-pointer"
          >
            ➕ Create Blog
          </div>
          <div
            onClick={() => navigate("/admin/blog/update-blog/:id")}
            className="hover:text-yellow-400 cursor-pointer"
          >
            ✏️ Update Blog
          </div>
          <div
            onClick={() => navigate("/admin/blog/delete-blog/:id")}
            className="hover:text-yellow-400 cursor-pointer"
          >
            🗑️ Delete Blog
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSideBarNavigation;
