"use client";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ParkingCircle, Car, MapPin } from "lucide-react";


function ThoothukudiParkingStats() {
  return (
    <Card className="bg-blue-50/70 hover:bg-blue-100/50 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ParkingCircle className="w-6 h-6 text-blue-600" />
          Thoothukudi Parking Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Parking Spots</p>
              <p className="font-semibold text-xl">1,245</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Parking Zones</p>
              <p className="font-semibold text-xl">12</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Occupancy Rate</span>
            <span className="font-medium text-blue-600">68%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{width: '68%'}}
            ></div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground text-center pt-2">
          Last Updated: March 2024
        </div>
      </CardContent>
    </Card>
  );
}

export default ThoothukudiParkingStats;