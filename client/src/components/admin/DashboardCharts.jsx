import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

export const DashboardCharts = ({ userTrend = [], enrollmentTrend = [] }) => {
  const chartData = (enrollmentTrend || []).map((entry, index) => ({
    month: entry.label,
    enrollments: entry.value,
    users: userTrend[index]?.value || 0,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">User Growth</h3>
            <p className="text-sm text-gray-600">New users per month</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="usersColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#usersColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Enrollment Trend</h3>
            <p className="text-sm text-gray-600">Monthly active enrollments</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="enrollments"
                  stroke="#7c3aed"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, stroke: "#7c3aed" }}
                  activeDot={{ r: 8, strokeWidth: 2, stroke: "#7c3aed" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
