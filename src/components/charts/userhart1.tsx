"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Car, Clock, History, User } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock user parking history data
const userParkingHistory = [
  {
    date: "Apr 10",
    duration: 2.5,
    zone: "Zone A",
    entryTime: "09:30 AM",
    exitTime: "12:00 PM",
  },
  {
    date: "Apr 08",
    duration: 1.0,
    zone: "Zone B",
    entryTime: "02:15 PM",
    exitTime: "03:15 PM",
  },
  {
    date: "Apr 07",
    duration: 3.5,
    zone: "Zone A",
    entryTime: "10:00 AM",
    exitTime: "01:30 PM",
  },
  {
    date: "Apr 05",
    duration: 2.0,
    zone: "Zone C",
    entryTime: "04:00 PM",
    exitTime: "06:00 PM",
  },
  {
    date: "Apr 03",
    duration: 1.5,
    zone: "Zone B",
    entryTime: "11:45 AM",
    exitTime: "01:15 PM",
  },
  {
    date: "Apr 01",
    duration: 4.0,
    zone: "Zone A",
    entryTime: "08:30 AM",
    exitTime: "12:30 PM",
  },
];

// Monthly usage data
const monthlyUsageData = [
  { month: "Jan", visits: 12, totalHours: 28 },
  { month: "Feb", visits: 15, totalHours: 32 },
  { month: "Mar", visits: 10, totalHours: 25 },
  { month: "Apr", visits: 6, totalHours: 14 },
];

// Zone preference data
const zonePreferenceData = [
  { name: "Zone A", value: 18 },
  { name: "Zone B", value: 8 },
  { name: "Zone C", value: 5 },
  { name: "Zone D", value: 2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function UserParkingHistory() {
  const [selectedUser, setSelectedUser] = useState("TN-69-AB-1234");

  return (
    <div className="space-y-6">
      {/* User Selection */}
      <Card className="bg-blue-50/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            User Parking History
          </CardTitle>
          <CardDescription className="text-sm">
            View detailed parking patterns and history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select vehicle number" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TN-69-AB-1234">
                  TN-69-AB-1234 (Rajesh Kumar)
                </SelectItem>
                <SelectItem value="TN-69-CD-5678">
                  TN-69-CD-5678 (Priya Sharma)
                </SelectItem>
                <SelectItem value="TN-69-EF-9012">
                  TN-69-EF-9012 (Mohan Lal)
                </SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full sm:w-auto">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="bg-blue-50/70">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <History className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Monthly Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={monthlyUsageData}
                margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar dataKey="visits" fill="#0088FE" name="Visits" />
                <Bar dataKey="totalHours" fill="#00C49F" name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-blue-50/70">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Stay Duration
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={userParkingHistory}
                margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line
                  type="monotone"
                  dataKey="duration"
                  stroke="#0088FE"
                  name="Hours"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-blue-50/70">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Car className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Zone Preference
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 flex justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <Pie
                  data={zonePreferenceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {zonePreferenceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Parking History Table */}
      <Card className="bg-blue-50/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            Recent Parking Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="rounded-md border min-w-[640px]">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-blue-100/50">
                <tr>
                  <th className="p-2 text-left font-medium">Date</th>
                  <th className="p-2 text-left font-medium">Zone</th>
                  <th className="p-2 text-left font-medium">Entry Time</th>
                  <th className="p-2 text-left font-medium">Exit Time</th>
                  <th className="p-2 text-left font-medium">Duration</th>
                </tr>
              </thead>
              <tbody>
                {userParkingHistory.map((entry, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-2">{entry.date}</td>
                    <td className="p-2">{entry.zone}</td>
                    <td className="p-2">{entry.entryTime}</td>
                    <td className="p-2">{entry.exitTime}</td>
                    <td className="p-2">{entry.duration} hrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row gap-2 sm:justify-between">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            View All Activity
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            Export Data
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
