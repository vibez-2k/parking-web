"use client"

import { useState } from "react"
import type { ParkingVenue } from "../../data/integrations"
import ParkingCard from "./IntegrationCard"
import Link from "next/link"

type ParkingGridProps = {
  venues: ParkingVenue[]
}

export default function ParkingGrid({ venues }: ParkingGridProps) {
  const [selectedVenue, setSelectedVenue] = useState<ParkingVenue | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {venues.map((venue) => (
          <div key={venue.id} onClick={() => setSelectedVenue(venue)} className="cursor-pointer">
            <ParkingCard venue={venue} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedVenue && (
                <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg  w-96 relative shadow-2xl">
            <button
              className="absolute top-6 right-5 font-bo text-gray-600 hover:text-black"
              onClick={() => setSelectedVenue(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedVenue.name}</h2>
            <p className="text-sm text-gray-500">{selectedVenue.location}</p>
            <p className="text-gray-700 mt-3">{selectedVenue.description}</p>
            <div className="mt-4 flex justify-between">
              <span className="text-green-600 font-semibold">{selectedVenue.availability}</span>
              <span className="text-gray-600">{selectedVenue.price}/hr</span>
            </div>

           {/* Live Feed Button */}
            {/* {selectedVenue.liveFeedUrl && ( */}
            <div className="mt-4 flex items-center justify-center space-x-2 animate-bounce">
              <span className="bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold">
                {selectedVenue.slotsdetails}
              </span>
            </div>
            
              <Link
                // href={selectedVenue.liveFeedUrl}
                href="/dashboard/live-feed"
                rel="noopener noreferrer"
                className="mt-4 block text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
              >
                🔴 Live Feed
              </Link>
            {/* )} */}
                </div>
        </div>
      )}
    </>
  )
}
