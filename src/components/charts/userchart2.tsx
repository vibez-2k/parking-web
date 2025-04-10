"use client";
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle, 
  Clock, 
  Car, 
  Calendar, 
  AlertTriangle,
  FileText,
  Search
} from "lucide-react";

// Sample user data
const userData = {
  id: "USR-1234",
  name: "Rajesh Kumar",
  vehicleNo: "TN-69-AB-1234",
  vehicleType: "Sedan - Maruti Swift",
  mobileNumber: "+91 98765 43210",
  joinedDate: "January 15, 2024",
  totalVisits: 45,
  averageDuration: "2.3 hours",
  preferredZones: ["Zone A", "Zone B"],
  commonEntryTimes: ["9:00 AM - 10:00 AM", "2:00 PM - 3:00 PM"],
  commonExitTimes: ["12:00 PM - 1:00 PM", "5:00 PM - 6:00 PM"],
  lastVisit: "April 10, 2025 (Today)",
  violations: [
    { date: "March 15, 2025", type: "Overstay", details: "Exceeded parking limit by 45 minutes", status: "Resolved" },
    { date: "February 22, 2025", type: "Wrong Zone", details: "Parked in restricted area", status: "Pending" }
  ],
  abnormalPatterns: [
    { date: "April 5, 2025", description: "Multiple entries and exits in a single day", status: "Flagged" }
  ]
};

// Sample visits by time of day data
const visitsByTimeData = [
  { timeSlot: "6-8 AM", visits: 3 },
  { timeSlot: "8-10 AM", visits: 12 },
  { timeSlot: "10-12 PM", visits: 7 },
  { timeSlot: "12-2 PM", visits: 5 },
  { timeSlot: "2-4 PM", visits: 10 },
  { timeSlot: "4-6 PM", visits: 6 },
  { timeSlot: "6-8 PM", visits: 2 },
  { timeSlot: "8-10 PM", visits: 0 }
];

export function UserAnalytics() {
  return (
    <Tabs defaultValue="overview" className="w-full space-y-4">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2">
        <TabsTrigger value="overview">User Overview</TabsTrigger>
        <TabsTrigger value="patterns">Parking Patterns</TabsTrigger>
        <TabsTrigger value="violations">Violations</TabsTrigger>
        <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
      </TabsList>
      
      {/* User Overview Tab */}
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <CardTitle className="text-xl break-words">{userData.name}</CardTitle>
                <CardDescription className="break-words">Vehicle: {userData.vehicleNo} ({userData.vehicleType})</CardDescription>
              </div>
              <Badge variant={userData.violations.length > 0 ? "destructive" : "outline"} className="whitespace-nowrap">
                {userData.violations.length > 0 ? `${userData.violations.length} Violations` : "No Violations"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ... rest of the content remains same ... */}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 border-t pt-4">
            <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
              <FileText className="h-4 w-4" />
              Download User Report
            </Button>
            <Button size="sm" className="gap-2 w-full sm:w-auto">
              <Search className="h-4 w-4" />
              Check Vehicle History
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Parking Patterns Tab */}
      <TabsContent value="patterns">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="overflow-x-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                Visit Frequency by Time of Day
              </CardTitle>
            </CardHeader>
            <CardContent className="min-w-[300px]">
              {/* ... rest of the content remains same ... */}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg break-words">
                <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
                Behavioral Pattern Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="font-medium flex items-center gap-2 flex-wrap">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    Irregular Pattern Detected
                  </div>
                  <p className="text-sm mt-1">User has unusual parking patterns on weekends, typically staying for less than 10 minutes.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* ... rest of the content remains same ... */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg break-words">
              <Car className="h-5 w-5 text-blue-600 flex-shrink-0" />
              Vehicle Movement Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* ... rest of the content remains same ... */}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Violations Tab */}
      <TabsContent value="violations">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 break-words">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              Parking Violations History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userData.violations.length > 0 ? (
              <div className="space-y-4">
                {userData.violations.map((violation, index) => (
                  <div key={index} className="p-4 border rounded bg-white">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                      <div>
                        <div className="font-medium break-words">{violation.type}</div>
                        <div className="text-sm text-gray-500">{violation.date}</div>
                      </div>
                      <Badge variant={violation.status === "Resolved" ? "outline" : "destructive"} className="whitespace-nowrap">
                        {violation.status}
                      </Badge>
                    </div>
                    <p className="text-sm mt-2">{violation.details}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500">No violation history found</div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Security Alerts Tab */}
      <TabsContent value="alerts">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 break-words">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
              Security Flags & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userData.abnormalPatterns.length > 0 ? (
              <div className="space-y-4">
                {userData.abnormalPatterns.map((pattern, index) => (
                  <div key={index} className="p-4 border rounded bg-amber-50 border-amber-200">
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <div className="font-medium text-amber-800 break-words">{pattern.description}</div>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 whitespace-nowrap">
                        {pattern.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-amber-700 mt-1">{pattern.date}</div>
                    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                      <Button size="sm" variant="outline" className="w-full sm:w-auto">Dismiss</Button>
                      <Button size="sm" variant="destructive" className="w-full sm:w-auto">Investigate</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500">No security alerts for this user</div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
              <h3 className="font-medium break-words">Security Assessment</h3>
              <div className="flex items-center mt-2">
                <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{width: "85%"}}></div>
                </div>
                <span className="ml-2 text-sm font-medium whitespace-nowrap">Low Risk</span>
              </div>
              <p className="text-sm mt-3">
                This user has a consistent parking pattern with minimal violations. 
                Has provided all required documentation and verification. 
                One minor flag for unusual entry/exit pattern on April 5, 2025.
              </p>
            </div>
          </CardContent>
          <CardFooter className="justify-end border-t pt-4">
            <Button size="sm" className="gap-2 w-full sm:w-auto">
              <AlertTriangle className="h-4 w-4" />
              Create Alert
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}