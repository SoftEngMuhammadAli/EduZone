import React, { useState } from "react";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  ThumbsUp,
  Share2,
  Bookmark,
  MoreVertical,
  UserPlus,
  Award,
  Sparkles,
  Hash,
  Globe,
  Video,
  Mic,
  PenTool,
  ChevronRight,
} from "lucide-react";

const CommunityView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  // Mock community data
  const categories = [
    { id: 1, name: "Web Development", icon: "🌐", count: 245, color: "blue" },
    { id: 2, name: "Data Science", icon: "📊", count: 189, color: "green" },
    { id: 3, name: "UI/UX Design", icon: "🎨", count: 156, color: "purple" },
    { id: 4, name: "Cloud Computing", icon: "☁️", count: 98, color: "orange" },
    { id: 5, name: "Mobile Development", icon: "📱", count: 134, color: "red" },
    { id: 6, name: "Career Advice", icon: "💼", count: 312, color: "yellow" },
  ];

  const trendingTopics = [
    {
      id: 1,
      title: "React 18 Best Practices",
      category: "Web Dev",
      posts: 45,
      trending: true,
    },
    {
      id: 2,
      title: "AI in Education",
      category: "AI/ML",
      posts: 32,
      trending: true,
    },
    {
      id: 3,
      title: "Portfolio Tips 2024",
      category: "Career",
      posts: 28,
      trending: false,
    },
    {
      id: 4,
      title: "Next.js vs Gatsby",
      category: "Web Dev",
      posts: 56,
      trending: true,
    },
  ];

  const discussions = [
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        role: "Senior Developer",
        avatar:
          "https://ui-avatars.com/api/?name=Alex+Johnson&background=3B82F6&color=fff",
        verified: true,
      },
      title: "How to optimize React app performance?",
      content:
        "I've been working on a large React application and I'm looking for ways to improve the performance. Any suggestions on code splitting, lazy loading, or other optimization techniques?",
      category: "Web Development",
      likes: 42,
      comments: 15,
      shares: 8,
      time: "2 hours ago",
      tags: ["React", "Performance", "Optimization"],
    },
    {
      id: 2,
      user: {
        name: "Sarah Miller",
        role: "UX Designer",
        avatar:
          "https://ui-avatars.com/api/?name=Sarah+Miller&background=8B5CF6&color=fff",
        verified: true,
      },
      title: "Figma Auto-layout tips",
      content:
        "Sharing some advanced Figma auto-layout techniques that have saved me hours of work. Perfect for complex design systems!",
      category: "UI/UX Design",
      likes: 28,
      comments: 9,
      shares: 12,
      time: "5 hours ago",
      tags: ["Figma", "Design", "Productivity"],
    },
    {
      id: 3,
      user: {
        name: "Mike Chen",
        role: "Data Scientist",
        avatar:
          "https://ui-avatars.com/api/?name=Mike+Chen&background=10B981&color=fff",
        verified: false,
      },
      title: "Python pandas optimization",
      content:
        "Working with large datasets in pandas? Here are some memory optimization techniques that can make your data processing 10x faster.",
      category: "Data Science",
      likes: 35,
      comments: 11,
      shares: 6,
      time: "1 day ago",
      tags: ["Python", "Pandas", "Data"],
    },
    {
      id: 4,
      user: {
        name: "Emma Wilson",
        role: "Cloud Architect",
        avatar:
          "https://ui-avatars.com/api/?name=Emma+Wilson&background=F59E0B&color=fff",
        verified: true,
      },
      title: "AWS Cost Optimization Strategies",
      content:
        "Cloud bills getting out of control? Let's discuss practical AWS cost optimization strategies that actually work.",
      category: "Cloud Computing",
      likes: 51,
      comments: 18,
      shares: 9,
      time: "2 days ago",
      tags: ["AWS", "Cloud", "DevOps"],
    },
  ];

  const events = [
    {
      id: 1,
      title: "React Workshop",
      date: "Tomorrow",
      time: "2:00 PM",
      type: "Workshop",
      attendees: 45,
    },
    {
      id: 2,
      title: "Career Q&A",
      date: "Friday",
      time: "4:00 PM",
      type: "Q&A",
      attendees: 32,
    },
    {
      id: 3,
      title: "Design Review",
      date: "Next Week",
      time: "11:00 AM",
      type: "Review",
      attendees: 28,
    },
  ];

  const stats = [
    { label: "Total Members", value: "5,248", icon: Users, color: "blue" },
    {
      label: "Active Discussions",
      value: "342",
      icon: MessageSquare,
      color: "green",
    },
    { label: "Events This Week", value: "8", icon: Calendar, color: "purple" },
    {
      label: "Knowledge Shared",
      value: "1.2k",
      icon: TrendingUp,
      color: "orange",
    },
  ];

  const handleJoinEvent = (eventId) => {
    console.log(`Joining event: ${eventId}`);
    // Implement join event logic
  };

  const handleLikePost = (postId) => {
    console.log(`Liking post: ${postId}`);
    // Implement like logic
  };

  const handleBookmark = (postId) => {
    console.log(`Bookmarking post: ${postId}`);
    // Implement bookmark logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-sm font-semibold mb-4">
                <Users className="w-4 h-4" />
                LEARNING COMMUNITY
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Connect with{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Fellow Learners
                </span>
              </h1>
              <p className="text-gray-600 max-w-3xl">
                Join discussions, share knowledge, and grow together with a
                global community of passionate learners and industry experts.
              </p>
            </div>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              <PenTool className="w-5 h-5" />
              Start Discussion
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}
                  >
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search and Tabs */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search discussions, topics, or members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto">
                {["all", "trending", "questions", "resources", "events"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        activeTab === tab
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ),
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Global Community</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Discussions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trending Topics */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Trending Topics
                    </h3>
                    <p className="text-sm text-gray-600">
                      What the community is talking about
                    </p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {trendingTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                          <Hash className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {topic.title}
                          </h4>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span>{topic.category}</span>
                            <span>•</span>
                            <span>{topic.posts} posts</span>
                          </div>
                        </div>
                      </div>
                      {topic.trending && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                          Trending
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Discussions List */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Recent Discussions
              </h3>
              {discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    {/* Discussion Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={discussion.user.avatar}
                            alt={discussion.user.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          {discussion.user.verified && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                              <Award className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {discussion.user.name}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{discussion.user.role}</span>
                            <span>•</span>
                            <span>{discussion.time}</span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 bg-${
                          discussion.category === "Web Development"
                            ? "blue"
                            : discussion.category === "UI/UX Design"
                              ? "purple"
                              : discussion.category === "Data Science"
                                ? "green"
                                : "orange"
                        }-100 
                                      text-${
                                        discussion.category ===
                                        "Web Development"
                                          ? "blue"
                                          : discussion.category ===
                                              "UI/UX Design"
                                            ? "purple"
                                            : discussion.category ===
                                                "Data Science"
                                              ? "green"
                                              : "orange"
                                      }-700 
                                      text-sm font-medium rounded-full`}
                      >
                        {discussion.category}
                      </span>
                    </div>

                    {/* Discussion Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {discussion.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{discussion.content}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {discussion.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleLikePost(discussion.id)}
                          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                        >
                          <ThumbsUp className="w-5 h-5" />
                          <span>{discussion.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <MessageSquare className="w-5 h-5" />
                          <span>{discussion.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>{discussion.shares}</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleBookmark(discussion.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Bookmark className="w-5 h-5 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Categories
                </h3>
                <p className="text-sm text-gray-600">Explore by interest</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{category.icon}</div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {category.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {category.count} discussions
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Upcoming Events
                    </h3>
                    <p className="text-sm text-gray-600">Join live sessions</p>
                  </div>
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span>{event.date}</span>
                            <span>•</span>
                            <span>{event.time}</span>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                          {event.type}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} attending</span>
                        </div>
                        <button
                          onClick={() => handleJoinEvent(event.id)}
                          className="px-4 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow transition-all text-sm"
                        >
                          Join
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Top Contributors
                    </h3>
                    <p className="text-sm text-gray-600">
                      Most helpful members
                    </p>
                  </div>
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      name: "Alex Chen",
                      role: "React Expert",
                      contributions: 142,
                    },
                    {
                      name: "Maria Garcia",
                      role: "Data Scientist",
                      contributions: 128,
                    },
                    {
                      name: "David Kim",
                      role: "UI/UX Designer",
                      contributions: 96,
                    },
                    {
                      name: "Sarah Johnson",
                      role: "Cloud Architect",
                      contributions: 87,
                    },
                  ].map((contributor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center">
                          <span className="text-white font-bold">
                            {contributor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {contributor.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {contributor.role}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {contributor.contributions}
                        </div>
                        <div className="text-xs text-gray-500">posts</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Follow All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Start New Discussion
              </h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="What would you like to discuss?"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  rows={6}
                  placeholder="Share your thoughts, questions, or resources..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Add relevant tags (separate with commas)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowNewPostModal(false);
                  // Handle post submission
                }}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                Publish Discussion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityView;
