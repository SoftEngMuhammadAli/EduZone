import React from "react";
import {
  BarChart,
  Bar,
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
  PieChart,
  Pie,
  Cell,
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

const pieData = [
  { name: "Students", value: 65, color: "#3B82F6" },
  { name: "Instructors", value: 15, color: "#10B981" },
  { name: "Admins", value: 5, color: "#EF4444" },
  { name: "Guests", value: 15, color: "#8B5CF6" },
];

export const DashboardCharts = () => {
  return (
    <div className="space-y-8">
      {/* Enrollment & Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enrollment Chart */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">User Growth</h3>
              <p className="text-sm text-gray-600">Monthly enrollment trends</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">Students</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">Instructors</span>
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentData}>
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
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="url(#colorStudents)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="instructors"
                  stackId="1"
                  stroke="#10B981"
                  fill="url(#colorInstructors)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient
                    id="colorStudents"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorInstructors"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

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
            <div className="px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-sm font-medium rounded-full">
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

      {/* User Distribution Chart */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              User Distribution
            </h3>
            <p className="text-sm text-gray-600">Platform user composition</p>
          </div>
          <div className="text-sm text-gray-500">Total: 100%</div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={(entry) => `${entry.name}: ${entry.value}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                }}
                formatter={(value) => [`${value}%`, "Percentage"]}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{
                  paddingLeft: "20px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
