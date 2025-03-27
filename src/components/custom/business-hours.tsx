"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface BusinessHour {
  day: string
  isOpen: boolean
  openTime?: string
  closeTime?: string
}

interface BusinessHoursProps {
  value: BusinessHour[]
  onChange: (hours: BusinessHour[]) => void
}

export function BusinessHours({ value, onChange }: BusinessHoursProps) {
  const [hours, setHours] = useState<BusinessHour[]>(value)

  // Generate time options in 30-minute increments
  const timeOptions = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      timeOptions.push(`${formattedHour}:${formattedMinute}`)
    }
  }

  const handleToggleDay = (index: number, isOpen: boolean) => {
    const updatedHours = [...hours]
    updatedHours[index].isOpen = isOpen

    // If toggling to open, set default times if not already set
    if (isOpen) {
      if (!updatedHours[index].openTime) updatedHours[index].openTime = "09:00"
      if (!updatedHours[index].closeTime) updatedHours[index].closeTime = "17:00"
    }

    setHours(updatedHours)
    onChange(updatedHours)
  }

  const handleTimeChange = (index: number, field: "openTime" | "closeTime", value: string) => {
    const updatedHours = [...hours]
    updatedHours[index][field] = value
    setHours(updatedHours)
    onChange(updatedHours)
  }

  const copyToAllDays = (fromIndex: number) => {
    const sourceDay = hours[fromIndex]
    const updatedHours = hours.map((day) => ({
      ...day,
      isOpen: sourceDay.isOpen,
      openTime: sourceDay.openTime,
      closeTime: sourceDay.closeTime,
    }))
    setHours(updatedHours)
    onChange(updatedHours)
  }

  return (
    <div className="space-y-4">
      {hours.map((day, index) => (
        <div key={day.day} className="grid grid-cols-[1fr_auto_1fr_1fr_auto] gap-2 items-center">
          <div className="font-medium">{day.day}</div>

          <Switch checked={day.isOpen} onCheckedChange={(checked) => handleToggleDay(index, checked)} />

          {day.isOpen ? (
            <>
              <Select
                value={day.openTime}
                onValueChange={(value) => handleTimeChange(index, "openTime", value)}
                disabled={!day.isOpen}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Open time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={`open-${time}`} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={day.closeTime}
                onValueChange={(value) => handleTimeChange(index, "closeTime", value)}
                disabled={!day.isOpen}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Close time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={`close-${time}`} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => copyToAllDays(index)}
                title="Copy to all days"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="col-span-3 text-muted-foreground">Closed</div>
          )}
        </div>
      ))}
    </div>
  )
}

