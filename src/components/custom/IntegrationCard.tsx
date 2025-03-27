
import type { ParkingVenue } from "../../data/integrations"
import { Card, CardContent } from "@/components/ui/card"

type ParkingCardProps = {
  venue: ParkingVenue
}

export default function ParkingCard({ venue }: ParkingCardProps) {
  const Icon = venue.icon

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex flex-col items-center text-center space-y-2 mb-2">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: `${venue.color}20` }}
          >
            <Icon
              className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
              style={{ color: venue.color }}
            />
          </div>
          <h3 className="font-semibold text-sm">{venue.name}</h3>
          <p className="text-xs text-gray-400">{venue.location}</p>
        </div>
        <p className="text-xs text-gray-500 flex-grow overflow-hidden">
          {venue.description.length > 150
            ? `${venue.description.substring(0, 80)}...`
            : venue.description}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <span className={`text-sm font-semibold ${venue.availability === "Available" ? "text-green-500" : "text-red-500"}`}>
            {venue.availability}
          </span>
          <span className="text-sm text-gray-600">{venue.price}/hr</span>
        </div>
      </CardContent>
    </Card>
  )
}
