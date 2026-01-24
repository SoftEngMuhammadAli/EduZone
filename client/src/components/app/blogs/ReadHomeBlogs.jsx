import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../../features/admin/blogSlice";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import Loader from "../../common/Loader";

const ReadHomeBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Reading time calculator
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  const gradientColors = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-green-500 to-emerald-400",
    "from-orange-500 to-yellow-400",
    "from-red-500 to-rose-400",
    "from-indigo-500 to-blue-400",
  ];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Unable to Load Content
        </h3>
        <p className="text-gray-600 mb-6 max-w-md text-center">
          {typeof error === "string" ? error : "An error occurred"}
        </p>
        <button
          onClick={() => dispatch(fetchBlogs())}
          className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <BookOpen className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Insights Available
        </h3>
        <p className="text-gray-600 max-w-md text-center">
          We're currently preparing valuable content. Check back soon for the
          latest insights and updates.
        </p>
      </div>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            INSIGHTS & UPDATES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Insights & News
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover valuable perspectives, industry trends, and educational
            insights from our expert contributors.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">
                Trending Insights
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {blogs.length}+ articles published
            </div>
          </div>
          <button
            onClick={() => navigate("/view-all-blogs")}
            className="group relative bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            <span className="relative flex items-center gap-2">
              Explore All Insights
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((item, index) => {
            const colorIndex = index % gradientColors.length;
            const content = item.content || "";

            return (
              <div
                key={item._id}
                className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-transparent"
              >
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradientColors[colorIndex]} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
                ></div>

                {/* Blog Header - Abstract Design */}
                <div
                  className={`h-48 relative overflow-hidden bg-gradient-to-br ${gradientColors[colorIndex]}`}
                >
                  {/* Abstract Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-32 h-32 border-4 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-4 border-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      {item.category || "Insights"}
                    </span>
                  </div>

                  {/* Reading Time */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-black/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      <Clock className="w-3 h-3" />
                      {calculateReadingTime(content)}
                    </span>
                  </div>

                  {/* Central Blog Symbol */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                      <div className="text-white text-2xl font-bold">
                        {item.title?.charAt(0) || "B"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  {/* Date and Author */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(item.publish_date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {item.author?.name || "EDU-ZONE Team"}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-gray-800 transition-colors">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-1">
                    {content.substring(0, 150)}...
                  </p>

                  {/* Read More Button */}
                  <div className="mt-auto">
                    <button
                      onClick={() => {
                        navigate(`/view-blog-details/${item._id}`, {
                          state: { blog: item },
                        });
                      }}
                      className="group w-full bg-gray-50 hover:bg-gray-900 text-gray-700 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Read Full Insight</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${gradientColors[colorIndex]} group-hover:w-full transition-all duration-700 rounded-t-full`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Stay Updated with Insights
                </h3>
                <p className="text-gray-300 mb-6">
                  Subscribe to receive the latest educational insights, industry
                  trends, and platform updates directly in your inbox.
                </p>
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button className="absolute right-2 top-2 bg-white text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {blogs.length}+
            </div>
            <p className="text-gray-700 font-medium">Published Articles</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
            <p className="text-gray-700 font-medium">Monthly Readers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
            <p className="text-gray-700 font-medium">Engagement Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadHomeBlogs;
