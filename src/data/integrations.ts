import {
  Car,
  ParkingCircle,
  MapPin,
  Timer,
  Shield,
  Building,
  Navigation,
  TrafficCone,
  Key,
  Lightbulb,
  Truck,
  Wifi,
} from "lucide-react"
import type React from "react"

export type ParkingVenue = {
  id: string
  name: string
  description: string
  status: string
  icon: React.ComponentType
  color: string
  location: string
  availability: string
  price: string
  slotsdetails: string
}

export const parkingStatuses = [
  "All",
  "Not Available",
  "In Service",
  "Available",
  "Out of Service",
  "Under Construction",
]

const iconMap = {
  Car,
  ParkingCircle,
  MapPin,
  Timer,
  Shield,
  Building,
  Navigation,
  TrafficCone,
  Key,
  Lightbulb,
  Truck,
  Wifi,
}

const colorPalette = [
  "#4CAF50", // Green - Available
  "#D32D27", // Red - Not Available
  "#FF9800", // Orange - Under Construction
  "#FFC107", // Yellow - In Service
  "#607D8B", // Gray - Out of Service
]

const slots = [
  "30/50 - capacity(50)",
  "20/100 - capacity(100)",
  "45/60 - capacity(60)",
  "10/30 - capacity(30)",
  "5/25 - capacity(25)"
]

const locationNames = [
  "Downtown",
  "City Center",
  "Business District",
  "Residential Area",
  "Industrial Zone",
  "Suburb",
  "Shopping Mall",
  "Airport",
  "Train Station",
  "Bus Terminal",
  "Seaport",]


    function generateParkingVenues(count: number): ParkingVenue[] {
  const venues: ParkingVenue[] = []
  const iconKeys = Object.keys(iconMap)

  for (let i = 0; i < count; i++) {
    const iconKey = iconKeys[Math.floor(Math.random() * iconKeys.length)]
    const status = parkingStatuses[Math.floor(Math.random() * (parkingStatuses.length - 1)) + 1] // Exclude 'All'
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
    const location = locationNames[Math.floor(Math.random() * locationNames.length)]
    const availability = status === "Available" ? "Available" : "Not Available"
    const price = status === "Available" ? (Math.random() * 10).toFixed(2) : "7.00"
    const slotsdetails = slots[Math.floor(Math.random() * slots.length)]
    venues.push({
      id: `${i + 1}`,
      name: `Parking Lot ${i + 1}`,
      description: `Parking Lot ${i + 1} is currently ${status.toLowerCase()}. It offers secure parking with modern amenities, ensuring convenience and safety for all vehicles. Whether you need short-term or long-term parking, this venue is designed to meet your needs with easy accessibility and efficient management.`,
      status,
      icon: iconMap[iconKey],
      color,
      location,
      availability,
      price,
      slotsdetails,
    })
  }

  return venues
}

export const parkingVenues = generateParkingVenues(1000)
