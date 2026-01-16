import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/admin/courseSlice";
import useFetchData from "../../hooks/useCustomHooks";
import { BASE_URL } from "../../utils/constants";
import AdminSideBarNavigation from "../../components/admin/AdminSideBar";
import UserProfileCard from "../../components/admin/UserProfileCard";
import AdminDashboardStatsCards from "../../components/admin/AdminStatsCards";
import AdminDashboardCourses from "../../components/admin/AdminDashboardCourses";
import AdminDashboardBlogs from "../../components/admin/AdminDashboardBlogs";
import { DashboardCharts } from "../../components/admin/DashboardCharts";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { courses, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const { data: studentsData, loading: studentsLoading } = useFetchData(
    `${BASE_URL}/api/users/role/student`,
    "GET",
  );

  const { data: adminsData, loading: adminLoading } = useFetchData(
    `${BASE_URL}/api/users/role/admin`,
    "GET",
  );

  const { data: instructorsData, loading: instructorsLoading } = useFetchData(
    `${BASE_URL}/api/users/role/instructor`,
    "GET",
  );

  const {
    data: blogs,
    loading: blogsLoading,
    error: blogsError,
  } = useFetchData(`${BASE_URL}/api/blogs`, "GET");

  const studentsCount = studentsLoading
    ? "..."
    : (studentsData || []).filter((user) => user.user_type === "student")
        .length;

  const adminsCount = adminLoading
    ? "..."
    : (adminsData || []).filter((user) => user.user_type === "admin").length;

  const instructorsCount = instructorsLoading
    ? "..."
    : (instructorsData || []).filter((user) => user.user_type === "instructor")
        .length;

  const blogsCount = blogsLoading ? "..." : blogs?.length || 0;

  const coursesCount = loading ? "..." : courses?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-col md:flex-row flex-1">
        <AdminSideBarNavigation />

        <main className="flex-1 p-4 md:p-8">
          <UserProfileCard />

          <AdminDashboardStatsCards
            studentsCount={studentsCount}
            instructorsCount={instructorsCount}
            coursesCount={coursesCount}
            blogsCount={blogsCount}
            adminsCount={adminsCount}
          />

          <DashboardCharts />

          <AdminDashboardCourses
            courses={courses}
            loading={loading}
            error={error}
          />

          <AdminDashboardBlogs
            blogs={blogs}
            loading={blogsLoading}
            error={blogsError}
          />
        </main>
      </div>
      <footer className="bg-[#1D2130] px-4 py-6 border-t text-center text-sm text-white">
        <p>© Copyright EDUZONE 2025 - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
