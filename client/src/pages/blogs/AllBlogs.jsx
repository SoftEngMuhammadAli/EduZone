import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../features/admin/blogSlice";
import { AppFooter } from "../../components/footer/Footer";

const ReadAllBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setShowModal(false);
  };

  if (loading)
    return (
      <div className="text-center py-8 text-[#1C1E53]">Loading blogs...</div>
    );
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!blogs.length)
    return (
      <div className="text-center py-8 text-[#1C1E53]">No blogs found.</div>
    );

  return (
    <>
      <section className="bg-white text-black py-12 px-4 lg:px-20 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full border border-gray-300 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C1E53]"
            />
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden cursor-pointer"
                onClick={() => openModal(blog)}
              >
                <div className="h-56 bg-gray-100 overflow-hidden">
                  {blog.images?.[0] ? (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                        blog.images[0]
                      }`}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(blog.publish_date).toDateString()}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-4 mb-4">
                    {blog.content}
                  </p>
                  <span className="text-sm text-[#1C1E53] font-medium mt-auto">
                    Read More →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Modal */}
      {showModal && selectedBlog && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[50%] max-h-[90vh] overflow-y-auto rounded-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
            >
              &times;
            </button>

            {/* Blog Modal Content */}
            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>

            {selectedBlog.images?.[0] && (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                  selectedBlog.images[0]
                }`}
                alt={selectedBlog.title}
                className="w-full h-80 object-cover rounded mb-4"
              />
            )}

            <p className="text-sm text-gray-500 mb-2">
              Published: {new Date(selectedBlog.publish_date).toDateString()}
            </p>
            <p className="text-base text-gray-800 leading-relaxed whitespace-pre-line">
              {selectedBlog.content}
            </p>
          </div>
        </div>
      )}

      <AppFooter />
    </>
  );
};

export default ReadAllBlogs;
