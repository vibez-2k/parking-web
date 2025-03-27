"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar, Car, Clock, Filter, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Mock data for parking history
const parkingHistory = [
  {
    id: "P12345",
    location: "Downtown Parking Garage",
    address: "123 Main St, Downtown",
    entryTime: new Date("2025-03-25T09:30:00"),
    exitTime: new Date("2025-03-25T14:45:00"),
    duration: "5h 15m",
    vehicle: "Tesla Model 3",
    licensePlate: "ABC123",
    status: "completed",
    amount: "₹120.50",
    spotNumber: "A-15",
  },
  {
    id: "P12346",
    location: "City Center Mall",
    address: "456 Market Ave, City Center",
    entryTime: new Date("2025-03-23T10:15:00"),
    exitTime: new Date("2025-03-23T12:30:00"),
    duration: "2h 15m",
    vehicle: "Tesla Model 3",
    licensePlate: "ABC123",
    status: "completed",
    amount: "₹50.25",
    spotNumber: "B-22",
  },
  {
    id: "P12347",
    location: "Airport Long-Term Parking",
    address: "789 Airport Blvd, Terminal Area",
    entryTime: new Date("2025-03-20T07:00:00"),
    exitTime: new Date("2025-03-22T19:45:00"),
    duration: "2d 12h 45m",
    vehicle: "Tesla Model 3",
    licensePlate: "ABC123",
    status: "completed",
    amount: "₹650.00",
    spotNumber: "L-108",
  },
  {
    id: "P12348",
    location: "North Beach Parking",
    address: "321 Beach Road, North Beach",
    entryTime: new Date("2025-03-27T08:30:00"),
    exitTime: null,
    duration: "Active",
    vehicle: "Tesla Model 3",
    licensePlate: "ABC123",
    status: "active",
    amount: "In progress",
    spotNumber: "C-09",
  },
  {
    id: "P12349",
    location: "Central Park Underground",
    address: "555 Park Avenue, Central District",
    entryTime: new Date("2025-03-18T13:20:00"),
    exitTime: new Date("2025-03-18T17:45:00"),
    duration: "4h 25m",
    vehicle: "BMW X5",
    licensePlate: "XYZ789",
    status: "completed",
    amount: "₹90.75",
    spotNumber: "U-42",
  },
]

export default function ParkingHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")

  // Filter parking history based on search query and filters
  const filteredHistory = parkingHistory.filter((item) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    // Time filter (simplified for demo)
    let matchesTime = true
    if (timeFilter === "today") {
      matchesTime = item.entryTime.toDateString() === new Date().toDateString()
    } else if (timeFilter === "week") {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      matchesTime = item.entryTime >= oneWeekAgo
    } else if (timeFilter === "month") {
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
      matchesTime = item.entryTime >= oneMonthAgo
    }

    return matchesSearch && matchesStatus && matchesTime
  })

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Parking History</h1>
          <p className="text-muted-foreground">View and manage your parking session history</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by location, ID, or license plate..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[130px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-4">
              <div className="space-y-4">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item) => <ParkingHistoryCard key={item.id} item={item} />)
                ) : (
                  <div className="text-center py-12">
                    <Car className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No parking records found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="calendar" className="mt-4">
              <div className="bg-white  rounded-lg border p-6 text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">Calendar View</h3>
                <p className="mt-2 text-sm text-muted-foreground">Calendar view is coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

interface ParkingHistoryCardProps {
  item: (typeof parkingHistory)[0]
}

function ParkingHistoryCard({ item }: ParkingHistoryCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-1/4 bg-blue-50  p-6 flex flex-col justify-center items-center">
            <div className="absolute top-4 left-4">
              <Badge
                variant={item.status === "active" ? "default" : "secondary"}
                className={cn("capitalize", item.status === "active" && "bg-green-500 hover:bg-green-600")}
              >
                {item.status}
              </Badge>
            </div>
            <Car className="h-12 w-12 text-blue-600  mb-2" />
            <div className="text-center">
              <p className="font-medium">{item.vehicle}</p>
              <p className="text-sm text-muted-foreground">{item.licensePlate}</p>
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">{item.location}</h3>
                <div className="flex items-center text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{item.address}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{item.amount}</div>
                <div className="text-sm text-muted-foreground">Spot {item.spotNumber}</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Entry</div>
                  <div className="text-sm text-muted-foreground">{format(item.entryTime, "MMM d, yyyy • h:mm a")}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Exit</div>
                  <div className="text-sm text-muted-foreground">
                    {item.exitTime ? format(item.exitTime, "MMM d, yyyy • h:mm a") : "In progress"}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm">
                <span className="font-medium">Duration:</span> {item.duration}
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

