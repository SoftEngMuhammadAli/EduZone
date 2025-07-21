import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById } from "../../features/admin/blogSlice";
import { useParams } from "react-router-dom";
import { AppFooter } from "../../components/footer/Footer";

const BlogsDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedBlog, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (id) dispatch(getBlogById(id));
  }, [dispatch, id]);

  const handleShare = async () => {
    const shareData = {
      title: selectedBlog?.title,
      text: selectedBlog?.title,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        alert("Could not share this blog.");
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Could not copy link.");
      }
    }
  };

  if (loading)
    return (
      <div className="text-center py-8 text-[#1C1E53]">Loading blog...</div>
    );
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!selectedBlog)
    return (
      <div className="text-center py-8 text-[#1C1E53]">No blog found.</div>
    );

  return (
    <>
      <section className="max-w-5xl shadow mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4">{selectedBlog.title}</h1>

        <div className="h-56 bg-gray-100 overflow-hidden">
          {selectedBlog.image ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                selectedBlog.image
              }`}
              alt={selectedBlog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
              No Image
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-6 mt-3">
          {new Date(selectedBlog.publish_date).toDateString()}
        </p>
        <div className="text-base text-gray-800 leading-relaxed">
          {selectedBlog.content}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleShare}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Share Blog
          </button>
        </div>
      </section>
      <AppFooter />
    </>
  );
};

export default BlogsDetails;
