import MapboxGlobeView from '@/components/map/MapboxGlobeView'
import React from 'react'

function ParkingMapPage() {
  return (
    <div className="w-full h-screen">
      <MapboxGlobeView 
        initialLongitude={77.5946} // Example: Bangalore, India
        initialLatitude={12.9716}
        zoom={4}
      />
    </div>
  )
}

export default ParkingMapPage;