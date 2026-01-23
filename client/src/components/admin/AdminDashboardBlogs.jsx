import React from "react";
import { Calendar, Eye, User, ArrowRight, BookOpen } from "lucide-react";

const AdminDashboardBlogs = ({ blogs = [], loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Latest Blog Posts
            </h3>
            <p className="text-gray-600 text-sm">Recent articles and updates</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="p-6">
        {error ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-gray-600">Unable to load blogs</p>
          </div>
        ) : blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.slice(0, 4).map((blog) => (
              <div
                key={blog._id}
                className="group bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Blog Image/Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                    {blog.image ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    ) : (
                      <BookOpen className="w-8 h-8 text-purple-600" />
                    )}
                  </div>

                  {/* Blog Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 line-clamp-1 mb-1 group-hover:text-purple-600 transition-colors">
                      {blog.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {blog.content}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.publish_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {blog.author?.name || "Admin"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />0 views
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                    <ArrowRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="font-semibold text-gray-700 mb-2">No Blog Posts</h4>
            <p className="text-gray-500 text-sm">
              Start creating content for your audience
            </p>
            <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all">
              Create First Post
            </button>
          </div>
        )}

        {/* View All Button */}
        {blogs.length > 0 && (
          <button className="w-full mt-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            View All Blog Posts
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardBlogs;
