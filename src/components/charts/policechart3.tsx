"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert, AlertTriangle, Car, Clock } from "lucide-react";

export default function PoliceStatusGrid() {
  // Security statistics
  const securityData = {
    totalIncidents: 43,
    resolvedIncidents: 38,
    pendingInvestigations: 5,
    highPriorityAlerts: 2
  };

  // Calculate resolution rate
  const resolutionRate = ((securityData.resolvedIncidents / securityData.totalIncidents) * 100).toFixed(1) + "%";

  return (
    <div className="space-y-6">
      {/* Security Status Header */}
      <div className="text-center text-lg font-semibold">
        <ShieldAlert className="inline-block mr-2 text-blue-600" size={20} />
        Security Incident Resolution: <span className="text-blue-600">{resolutionRate}</span>
      </div>
      
      {/* Status Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { 
            label: "Total Incidents", 
            value: securityData.totalIncidents, 
            color: "bg-blue-100 text-blue-800",
            icon: <ShieldAlert className="h-5 w-5" />
          },
          { 
            label: "Resolved Cases", 
            value: securityData.resolvedIncidents, 
            color: "bg-green-100 text-green-800",
            icon: <Clock className="h-5 w-5" />
          },
          { 
            label: "Pending Investigation", 
            value: securityData.pendingInvestigations, 
            color: "bg-amber-100 text-amber-800",
            icon: <AlertTriangle className="h-5 w-5" />
          },
          { 
            label: "High Priority Alerts", 
            value: securityData.highPriorityAlerts, 
            color: "bg-red-100 text-red-800",
            icon: <Car className="h-5 w-5" />
          },
        ].map((stat, index) => (
          <Card key={index} className="bg-blue-50/70 hover:bg-blue-100/50 border border-dashed hover:border-primary transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className={`mb-2 px-3 py-1 rounded-full text-sm font-medium ${stat.color} flex items-center gap-2`}>
                {stat.icon}
                {stat.label}
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Alert Section */}
      <Card className="bg-red-50 border-red-200 border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 font-medium text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <span>Active Security Alerts</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between items-center p-2 bg-white rounded border border-red-100">
              <span className="font-medium">Zone B - Suspicious Activity</span>
              <span className="text-sm text-gray-500">10 mins ago</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded border border-red-100">
              <span className="font-medium">Zone A - Vehicle Violation</span>
              <span className="text-sm text-gray-500">25 mins ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}