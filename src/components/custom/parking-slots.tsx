"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ParkingSlot {
  id: string
  row: number
  column: number
  isAvailable: boolean
  isHandicap: boolean
  isElectric: boolean
}

interface ParkingSlotsProps {
  selectedSlot: string
  onSelectSlot: (slotId: string) => void
  date?: Date
  startTime?: string
}

export function ParkingSlots({ selectedSlot, onSelectSlot, date, startTime }: ParkingSlotsProps) {
  const [slots, setSlots] = useState<ParkingSlot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching available slots based on date and time
    setLoading(true)

    // In a real app, this would be an API call to check availability
    setTimeout(() => {
      // Generate parking slots with some random availability
      const generatedSlots: ParkingSlot[] = []

      for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 5; col++) {
          const id = `${String.fromCharCode(64 + row)}${col}`

          // Make some slots unavailable randomly
          // In a real app, this would come from the backend
          const randomAvailability = Math.random() > 0.3

          generatedSlots.push({
            id,
            row,
            column: col,
            isAvailable: randomAvailability,
            isHandicap: row === 1 && (col === 1 || col === 2),
            isElectric: row === 4 && (col === 4 || col === 5),
          })
        }
      }

      setSlots(generatedSlots)
      setLoading(false)

      // If no slot is selected yet and there are available slots, select the first one
      if (!selectedSlot && generatedSlots.some((slot) => slot.isAvailable)) {
        const firstAvailableSlot = generatedSlots.find((slot) => slot.isAvailable)
        if (firstAvailableSlot) {
          onSelectSlot(firstAvailableSlot.id)
        }
      }
    }, 1000)
  }, [date, startTime, selectedSlot, onSelectSlot])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-muted/20 rounded-md">
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          <p className="text-sm text-muted-foreground">Loading available slots...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
        {slots.map((slot) => (
          <button
            key={slot.id}
            type="button"
            disabled={!slot.isAvailable}
            onClick={() => slot.isAvailable && onSelectSlot(slot.id)}
            className={cn(
              "h-14 w-full rounded-md border-2 flex items-center justify-center transition-colors",
              slot.isAvailable
                ? "hover:bg-primary/10 border-muted-foreground/20"
                : "bg-muted/50 border-muted cursor-not-allowed opacity-50",
              selectedSlot === slot.id && "border-primary bg-primary/20",
              slot.isHandicap && "border-blue-500/50",
              slot.isElectric && "border-green-500/50",
            )}
          >
            <span className="font-medium">{slot.id}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-sm justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-muted-foreground/20"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-primary bg-primary/20"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-blue-500/50"></div>
          <span>Handicap</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-green-500/50"></div>
          <span>Electric</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-muted-foreground/20 bg-muted/50 opacity-50"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  )
}

