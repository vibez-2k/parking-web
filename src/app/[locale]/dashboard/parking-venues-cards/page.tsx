"use client"

import { useState, useMemo } from "react"
import { parkingStatuses, parkingVenues } from "@/data/integrations"
import CategoryFilter from "@/components/custom/CategoryFilter"
import SearchBar from "@/components/custom/SearchBar"
import ParkingGrid from "@/components/custom/IntegrationGrid"
import Pagination from "@/components/custom/Pagination"

const ITEMS_PER_PAGE = 10

export default function ParkingVenuesPage() {
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredVenues = useMemo(() => {
    return parkingVenues.filter((venue) => {
      const statusMatch = selectedStatus === "All" || venue.status === selectedStatus
      const searchMatch =
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.description.toLowerCase().includes(searchQuery.toLowerCase())
      return statusMatch && searchMatch
    })
  }, [selectedStatus, searchQuery, parkingVenues])

  const totalPages = Math.max(1, Math.ceil(filteredVenues.length / ITEMS_PER_PAGE))

  const paginatedVenues = useMemo(() => {
    return filteredVenues.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    )
  }, [filteredVenues, currentPage])

  return (
    <div className="flex flex-col">
      <main className="flex flex-col w-full">
        <div className="flex w-full justify-between items-center px-2">
          <h1 className="text-2xl font-bold">Parking Venues</h1>
          <SearchBar
            onSearch={(query) => {
              setSearchQuery(query)
              setCurrentPage(1)
            }}
          />
        </div>

        <div className="mb-4">

          <CategoryFilter
            categories={parkingStatuses}
            selectedCategory={selectedStatus}
            onSelectCategory={(status) => {
              setSelectedStatus(status)
              setCurrentPage(1)
            }}
          />
        </div>

        <div className="flex-grow px-6">
          {paginatedVenues.length > 0 ? (
            <ParkingGrid venues={paginatedVenues} />
          ) : (
            <p className="text-gray-500 text-center mt-6">No parking venues found.</p>
          )}

          {totalPages > 1 && (
            <div className="p-4 w-full">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
