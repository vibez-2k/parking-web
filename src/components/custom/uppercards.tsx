import { Card, CardContent } from "@/components/ui/card";

const totalSlots = 20; // Example total slots
const occupiedSlots = 8;
const availableSlots = 7;
const reservedSlots = 3;
const underMaintenanceSlots = 2;

const avgCapacity = ((occupiedSlots / totalSlots) * 100).toFixed(1) + "%";

const statuses = [
  { label: "Available", color: "bg-green-100 text-green-800" },
  { label: "Occupied", color: "bg-red-100 text-red-800" },
  { label: "Reserved", color: "bg-yellow-100 text-yellow-800" },
  { label: "Under Maintenance", color: "bg-gray-100 text-gray-800" },
];

export default function ParkingStatusGrid() {
  return (
    <div className="space-y-6  ">
      {/* Overview Cards */}
      {/* Avg Capacity */}
      <div className="text-center text-lg font-semibold">
        🏢 Average Capacity Usage: <span className="text-blue-600">{avgCapacity}</span>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Parking Slots", value: totalSlots, color: "bg-blue-100 text-blue-800" },
          { label: "Occupied Slots", value: occupiedSlots, color: "bg-red-100 text-red-800" },
          { label: "Available Slots", value: availableSlots, color: "bg-green-100 text-green-800" },
          { label: "Reserved Slots", value: reservedSlots, color: "bg-yellow-100 text-yellow-800" },
        ].map((stat, index) => (
          <Card key={index} className="bg-blue-50/70 hover:bg-blue-100/50 border border-dashed hover:border-primary transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className={`mb-2 px-3 py-1 rounded-full text-sm font-medium ${stat.color}`}>
                {stat.label}
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      

      {/* Individual Parking Spots */}
      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: totalSlots }, (_, index) => {
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

          return (
            <Card key={index} className="bg-muted/50 border border-dashed hover:border-primary transition-colors">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className={`mb-4 px-3 py-1 rounded-full text-sm font-medium ${randomStatus.color}`}>
                  {randomStatus.label}
                </div>
                <div className="text-xl font-semibold">Parking Spot {index + 1}</div>
              </CardContent>
            </Card>
          );
        })}
      </div> */}
    </div>
  );
}
