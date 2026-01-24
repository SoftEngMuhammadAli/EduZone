import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

// Mock data
const enrollmentData = [
  { name: "Jan", students: 42, instructors: 5, revenue: 2400 },
  { name: "Feb", students: 38, instructors: 7, revenue: 1398 },
  { name: "Mar", students: 56, instructors: 9, revenue: 9800 },
  { name: "Apr", students: 47, instructors: 8, revenue: 3908 },
  { name: "May", students: 63, instructors: 12, revenue: 4800 },
  { name: "Jun", students: 52, instructors: 10, revenue: 3800 },
  { name: "Jul", students: 71, instructors: 15, revenue: 4300 },
];

export const DashboardCharts = () => {
  return (
    <div className="space-y-8">
      {/* Enrollment & Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Revenue Overview
              </h3>
              <p className="text-sm text-gray-600">
                Monthly revenue performance
              </p>
            </div>
            <div className="px-3 py-1 bg-linear-to-r from-green-50 to-emerald-50 text-green-700 text-sm font-medium rounded-full">
              +24.5% this month
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                  }}
                  formatter={(value) => [`$${value}`, "Revenue"]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, stroke: "#8B5CF6" }}
                  activeDot={{ r: 8, strokeWidth: 2, stroke: "#8B5CF6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
