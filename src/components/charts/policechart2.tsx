"use client";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ShieldAlert, AlertTriangle, Clock, Car } from "lucide-react";

function PoliceParkingStats() {
  return (
    <Card className="bg-blue-50/70 hover:bg-blue-100/50 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldAlert className="w-6 h-6 text-blue-600" />
          Thoothukudi Parking Security Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-sm text-muted-foreground">Incident Reports (Monthly)</p>
              <p className="font-semibold text-xl">43</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
              <p className="font-semibold text-xl">4.2 min</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Security Patrol Coverage</span>
            <span className="font-medium text-blue-600">92%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{width: '92%'}}
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">Traffic Violations</p>
              <p className="font-semibold text-xl">28</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Resolved Cases</p>
              <p className="font-semibold text-xl">38</p>
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground text-center pt-2">
          Last Updated: April 10, 2025
        </div>
      </CardContent>
    </Card>
  );
}

export default PoliceParkingStats;