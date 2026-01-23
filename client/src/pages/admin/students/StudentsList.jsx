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
  Calendar,
  Eye,
  MoreVertical,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const StudentsListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    status: "all",
    sortBy: "newest",
  });

  const studentRole = "student";
  const {
    data: allUsers,
    loading: studentLoader,
    error: studentError,
    refetch: refetchStudents,
  } = useFetchData(`${BASE_URL}/api/users/role/${studentRole}`, "GET");

  const students =
    allUsers?.filter((user) => user.user_type === "student") || [];

  // Filter and search students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getAvatar = (student) =>
    student.profile_picture_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name || "Student")}&background=3B82F6&color=fff&size=128`;

  const getInitials = (name) => {
    if (!name) return "S";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (studentLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader title="Loading students..." />
      </div>
    );
  }

  if (studentError) {
    return <ErrorBox message={studentError} onRetry={refetchStudents} />;
  }

  if (!students?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorBox message="No students found." />
      </div>
    );
  }

  // Mock statistics
  const studentStats = [
    {
      label: "Active Students",
      value: students.length,
      change: "+12%",
      color: "blue",
    },
    { label: "Avg. Completion", value: "42%", change: "+8%", color: "green" },
    { label: "Avg. Rating", value: "4.7", change: "+0.3", color: "yellow" },
    { label: "Engagement", value: "78%", change: "+5%", color: "purple" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full text-sm font-semibold mb-3">
                <Users className="w-4 h-4" />
                STUDENT MANAGEMENT
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Student Directory
              </h1>
              <p className="text-gray-600">
                Manage and monitor all student accounts in your learning
                platform
              </p>
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              <User className="w-5 h-5" />
              Add New Student
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students by name, email, or bio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="premium">Premium</option>
                </select>

                <select
                  value={selectedFilters.sortBy}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value,
                    }))
                  }
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="engagement">Engagement</option>
                </select>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>{filteredStudents.length} students found</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>Total: {students.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {studentStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}
                  >
                    {stat.label === "Active Students" && (
                      <Users className={`w-6 h-6 text-${stat.color}-600`} />
                    )}
                    {stat.label === "Avg. Completion" && (
                      <Award className={`w-6 h-6 text-${stat.color}-600`} />
                    )}
                    {stat.label === "Avg. Rating" && (
                      <Sparkles className={`w-6 h-6 text-${stat.color}-600`} />
                    )}
                    {stat.label === "Engagement" && (
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

        {/* Students Grid/List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Table Header - Desktop */}
          <div className="hidden lg:grid grid-cols-12 gap-4 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
            <div className="col-span-3 font-semibold text-gray-900">
              Student Profile
            </div>
            <div className="col-span-2 font-semibold text-gray-900">
              Contact
            </div>
            <div className="col-span-3 font-semibold text-gray-900">
              Progress
            </div>
            <div className="col-span-2 font-semibold text-gray-900">Status</div>
            <div className="col-span-2 font-semibold text-gray-900 text-right">
              Actions
            </div>
          </div>

          {/* Students List */}
          <div className="divide-y divide-gray-100">
            {filteredStudents.map((student) => (
              <div
                key={student._id}
                className="group hover:bg-gray-50 transition-colors"
              >
                {/* Desktop View */}
                <div className="hidden lg:grid grid-cols-12 gap-4 p-6 items-center">
                  {/* Profile */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={getAvatar(student)}
                          alt={student.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {student.name}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          Student
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="col-span-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm truncate">
                          {student.email}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Joined{" "}
                        {new Date(
                          student.createdAt || Date.now(),
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="col-span-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Course Progress</span>
                        <span className="font-semibold">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                          style={{ width: "42%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Active
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex justify-end gap-2">
                    <button
                      onClick={() => navigate(`/admin/students/${student._id}`)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
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
                          src={getAvatar(student)}
                          alt={student.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {student.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{student.email}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {student.bio && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {student.bio}
                    </p>
                  )}

                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                          style={{ width: "42%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/admin/students/${student._id}`)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Profile
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                      Message
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
                  1-{filteredStudents.length}
                </span>{" "}
                of <span className="font-semibold">{students.length}</span>{" "}
                students
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all">
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

export default StudentsListPage;
