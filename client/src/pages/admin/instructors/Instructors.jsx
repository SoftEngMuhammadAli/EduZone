import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../hooks/useCustomHooks";
import { BASE_URL } from "../../../utils/constants";
import Loader from "../../../components/common/Loader";
import ErrorBox from "../../../components/common/ErrorBox";
import {
  Search,
  Filter,
  User,
  Mail,
  GraduationCap,
  Award,
  Star,
  Users,
  TrendingUp,
  BookOpen,
  Eye,
  MoreVertical,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const InstructorsListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    status: "all",
    expertise: "all",
  });

  const instructorRole = "instructor";
  const {
    data: allUsers,
    loading: loader,
    error: error,
    refetch: refetchInstructors,
  } = useFetchData(`${BASE_URL}/api/users/role/${instructorRole}`, "GET");

  const instructors =
    allUsers?.filter((user) => user.user_type === "instructor") || [];

  // Filter and search instructors
  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch =
      instructor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getAvatar = (instructor) =>
    instructor.profile_picture_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name || "Instructor")}&background=10B981&color=fff&size=128`;

  if (loader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader title="Loading instructors..." />
      </div>
    );
  }

  if (error) {
    return <ErrorBox message={error} onRetry={refetchInstructors} />;
  }

  if (!instructors?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorBox message="No instructors found." />
      </div>
    );
  }

  // Mock statistics
  const instructorStats = [
    {
      label: "Total Instructors",
      value: instructors.length,
      change: "+8%",
      color: "green",
    },
    { label: "Avg. Rating", value: "4.8", change: "+0.2", color: "yellow" },
    { label: "Active Courses", value: "45", change: "+12%", color: "blue" },
    {
      label: "Total Students",
      value: "1,248",
      change: "+15%",
      color: "purple",
    },
  ];

  // Mock expertise areas
  const expertiseAreas = [
    "Web Dev",
    "Data Science",
    "Design",
    "Business",
    "AI/ML",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full text-sm font-semibold mb-3">
                <GraduationCap className="w-4 h-4" />
                INSTRUCTOR MANAGEMENT
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Instructor Directory
              </h1>
              <p className="text-gray-600">
                Manage and collaborate with expert instructors on your platform
              </p>
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              <User className="w-5 h-5" />
              Add New Instructor
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search instructors by name, email, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={selectedFilters.status}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="featured">Featured</option>
                  <option value="pending">Pending</option>
                </select>

                <select
                  value={selectedFilters.expertise}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      expertise: e.target.value,
                    }))
                  }
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Expertise</option>
                  {expertiseAreas.map((area) => (
                    <option key={area} value={area.toLowerCase()}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>{filteredInstructors.length} instructors found</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>Total: {instructors.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {instructorStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}
                  >
                    {stat.label === "Total Instructors" && (
                      <Users className={`w-6 h-6 text-${stat.color}-600`} />
                    )}
                    {stat.label === "Avg. Rating" && (
                      <Star className={`w-6 h-6 text-${stat.color}-600`} />
                    )}
                    {stat.label === "Active Courses" && (
                      <BookOpen className={`w-6 h-6 text-${stat.color}-600`} />
                    )}
                    {stat.label === "Total Students" && (
                      <TrendingUp
                        className={`w-6 h-6 text-${stat.color}-600`}
                      />
                    )}
                  </div>
                  <div
                    className={`text-sm font-semibold text-${stat.color}-600`}
                  >
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructors Grid/List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Table Header - Desktop */}
          <div className="hidden lg:grid grid-cols-12 gap-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
            <div className="col-span-3 font-semibold text-gray-900">
              Instructor Profile
            </div>
            <div className="col-span-2 font-semibold text-gray-900">
              Expertise
            </div>
            <div className="col-span-2 font-semibold text-gray-900">
              Performance
            </div>
            <div className="col-span-2 font-semibold text-gray-900">
              Courses
            </div>
            <div className="col-span-3 font-semibold text-gray-900 text-right">
              Actions
            </div>
          </div>

          {/* Instructors List */}
          <div className="divide-y divide-gray-100">
            {filteredInstructors.map((instructor) => (
              <div
                key={instructor._id}
                className="group hover:bg-gray-50 transition-colors"
              >
                {/* Desktop View */}
                <div className="hidden lg:grid grid-cols-12 gap-4 p-6 items-center">
                  {/* Profile */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={getAvatar(instructor)}
                          alt={instructor.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {instructor.name}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          Certified Instructor
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expertise */}
                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-1">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Web Dev
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        React
                      </span>
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">4.8</span>
                      </div>
                      <div className="text-sm text-gray-600">(128 reviews)</div>
                    </div>
                  </div>

                  {/* Courses */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">5</span>
                      <span className="text-sm text-gray-600">courses</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-3 flex justify-end gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/instructors/${instructor._id}`)
                      }
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Profile
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                      Message
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={getAvatar(instructor)}
                          alt={instructor.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {instructor.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{instructor.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">4.8</span>
                    </div>
                  </div>

                  {instructor.bio && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {instructor.bio}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Web Development
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      Frontend
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      React
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-xl font-bold text-gray-900">5</div>
                      <div className="text-xs text-gray-600">Courses</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-xl font-bold text-gray-900">
                        1.2k
                      </div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/instructors/${instructor._id}`)
                      }
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Profile
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination/Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold">
                  1-{filteredInstructors.length}
                </span>{" "}
                of <span className="font-semibold">{instructors.length}</span>{" "}
                instructors
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorsListPage;
