"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Trash2, ShipWheelIcon as Wheelchair, Zap, MinusCircle, PlusCircle } from "lucide-react"

interface ParkingSpot {
  id: string
  type: string
  row: number
  column: number
}

interface ParkingLayoutEditorProps {
  totalSpots: number
  handicapSpots: number
  electricSpots: number
  compactSpots: number
  largeSpots: number
  onChange: (layout: ParkingSpot[]) => void
}

export function ParkingLayoutEditor({
  totalSpots,
  handicapSpots,
  electricSpots,
  compactSpots,
  largeSpots,
  onChange,
}: ParkingLayoutEditorProps) {
  const [layout, setLayout] = useState<ParkingSpot[]>([])
  const [rows, setRows] = useState(4)
  const [columns, setColumns] = useState(5)
  const [selectedSpotType, setSelectedSpotType] = useState("standard")
  const [mode, setMode] = useState<"add" | "remove">("add")

  // Initialize layout when component mounts or when totalSpots changes
  useEffect(() => {
    // Only initialize if layout is empty
    if (layout.length === 0) {
      const initialLayout: ParkingSpot[] = []
      let spotCount = 0

      // Calculate how many rows and columns we need
      const calculatedRows = Math.ceil(totalSpots / 5)
      const calculatedColumns = Math.min(5, totalSpots)

      setRows(calculatedRows)
      setColumns(calculatedColumns)

      // Create initial layout with standard spots
      for (let row = 0; row < calculatedRows && spotCount < totalSpots; row++) {
        for (let col = 0; col < calculatedColumns && spotCount < totalSpots; col++) {
          const id = `${String.fromCharCode(65 + row)}${col + 1}`
          initialLayout.push({
            id,
            type: "standard",
            row,
            column: col,
          })
          spotCount++
        }
      }

      // Assign handicap spots
      for (let i = 0; i < handicapSpots && i < initialLayout.length; i++) {
        initialLayout[i].type = "handicap"
      }

      // Assign electric spots
      for (let i = 0; i < electricSpots && i + handicapSpots < initialLayout.length; i++) {
        initialLayout[i + handicapSpots].type = "electric"
      }

      // Assign compact spots
      for (let i = 0; i < compactSpots && i + handicapSpots + electricSpots < initialLayout.length; i++) {
        initialLayout[i + handicapSpots + electricSpots].type = "compact"
      }

      // Assign large spots
      for (let i = 0; i < largeSpots && i + handicapSpots + electricSpots + compactSpots < initialLayout.length; i++) {
        initialLayout[i + handicapSpots + electricSpots + compactSpots].type = "large"
      }

      setLayout(initialLayout)
      onChange(initialLayout)
    }
  }, [totalSpots, handicapSpots, electricSpots, compactSpots, largeSpots, layout.length, onChange])

  // Handle spot click
  const handleSpotClick = (row: number, col: number) => {
    const spotIndex = layout.findIndex((spot) => spot.row === row && spot.column === col)

    if (mode === "add") {
      if (spotIndex === -1) {
        // Add new spot
        const id = `${String.fromCharCode(65 + row)}${col + 1}`
        const newSpot: ParkingSpot = {
          id,
          type: selectedSpotType,
          row,
          column: col,
        }

        const newLayout = [...layout, newSpot]
        setLayout(newLayout)
        onChange(newLayout)
      } else {
        // Update existing spot type
        const newLayout = [...layout]
        newLayout[spotIndex].type = selectedSpotType
        setLayout(newLayout)
        onChange(newLayout)
      }
    } else if (mode === "remove" && spotIndex !== -1) {
      // Remove spot
      const newLayout = layout.filter((spot) => !(spot.row === row && spot.column === col))
      setLayout(newLayout)
      onChange(newLayout)
    }
  }

  // Add row
  const addRow = () => {
    setRows(rows + 1)
  }

  // Remove row
  const removeRow = () => {
    if (rows > 1) {
      // Remove spots in the last row
      const newLayout = layout.filter((spot) => spot.row < rows - 1)
      setLayout(newLayout)
      onChange(newLayout)
      setRows(rows - 1)
    }
  }

  // Add column
  const addColumn = () => {
    setColumns(columns + 1)
  }

  // Remove column
  const removeColumn = () => {
    if (columns > 1) {
      // Remove spots in the last column
      const newLayout = layout.filter((spot) => spot.column < columns - 1)
      setLayout(newLayout)
      onChange(newLayout)
      setColumns(columns - 1)
    }
  }

  // Reset layout
  const resetLayout = () => {
    setLayout([])
    onChange([])
  }

  // Get spot at position
  const getSpotAt = (row: number, col: number) => {
    return layout.find((spot) => spot.row === row && spot.column === col)
  }

  // Get icon for spot type
  const getSpotIcon = (type: string) => {
    switch (type) {
      case "handicap":
        return <Wheelchair className="h-4 w-4" />
      case "electric":
        return <Zap className="h-4 w-4" />
      case "compact":
        return <Car className="h-3 w-3" />
      case "large":
        return <Car className="h-5 w-5" />
      default:
        return <Car className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="editor">Layout Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              type="button"
              variant={selectedSpotType === "standard" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpotType("standard")}
              className="flex items-center gap-1"
            >
              <Car className="h-4 w-4" />
              <span>Standard</span>
            </Button>

            <Button
              type="button"
              variant={selectedSpotType === "handicap" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpotType("handicap")}
              className="flex items-center gap-1"
            >
              <Wheelchair className="h-4 w-4" />
              <span>Handicap</span>
            </Button>

            <Button
              type="button"
              variant={selectedSpotType === "electric" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpotType("electric")}
              className="flex items-center gap-1"
            >
              <Zap className="h-4 w-4" />
              <span>Electric</span>
            </Button>

            <Button
              type="button"
              variant={selectedSpotType === "compact" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpotType("compact")}
              className="flex items-center gap-1"
            >
              <Car className="h-3 w-3" />
              <span>Compact</span>
            </Button>

            <Button
              type="button"
              variant={selectedSpotType === "large" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpotType("large")}
              className="flex items-center gap-1"
            >
              <Car className="h-5 w-5" />
              <span>Large</span>
            </Button>

            <Button
              type="button"
              variant={mode === "remove" ? "destructive" : "outline"}
              size="sm"
              onClick={() => setMode(mode === "add" ? "remove" : "add")}
              className="flex items-center gap-1 ml-auto"
            >
              <Trash2 className="h-4 w-4" />
              <span>{mode === "add" ? "Remove Mode" : "Cancel Remove"}</span>
            </Button>
          </div>

          <div className="bg-muted/20 p-4 rounded-md">
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <Button type="button" size="icon" variant="outline" onClick={removeRow} disabled={rows <= 1}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="text-sm">Rows: {rows}</span>
                <Button type="button" size="icon" variant="outline" onClick={addRow}>
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button type="button" size="icon" variant="outline" onClick={removeColumn} disabled={columns <= 1}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="text-sm">Columns: {columns}</span>
                <Button type="button" size="icon" variant="outline" onClick={addColumn}>
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: rows }).map((_, rowIndex) =>
                Array.from({ length: columns }).map((_, colIndex) => {
                  const spot = getSpotAt(rowIndex, colIndex)
                  return (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      type="button"
                      onClick={() => handleSpotClick(rowIndex, colIndex)}
                      className={cn(
                        "h-12 w-full rounded-md border-2 flex items-center justify-center transition-colors",
                        spot ? "border-primary/50" : "border-dashed border-muted-foreground/30",
                        mode === "add" ? "hover:bg-primary/10" : "hover:bg-destructive/10",
                        spot?.type === "handicap" && "bg-blue-100 border-blue-500",
                        spot?.type === "electric" && "bg-green-100 border-green-500",
                        spot?.type === "compact" && "bg-yellow-100 border-yellow-500",
                        spot?.type === "large" && "bg-orange-100 border-orange-500",
                      )}
                    >
                      {spot ? getSpotIcon(spot.type) : "+"}
                    </button>
                  )
                }),
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <Button type="button" variant="outline" size="sm" onClick={resetLayout}>
                Reset Layout
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <div className="bg-muted/20 p-6 rounded-md">
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: rows }).map((_, rowIndex) =>
                Array.from({ length: columns }).map((_, colIndex) => {
                  const spot = getSpotAt(rowIndex, colIndex)
                  if (!spot) return <div key={`${rowIndex}-${colIndex}`} className="h-12"></div>

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={cn(
                        "h-12 w-full rounded-md border-2 flex items-center justify-center",
                        spot.type === "handicap" && "bg-blue-100 border-blue-500",
                        spot.type === "electric" && "bg-green-100 border-green-500",
                        spot.type === "compact" && "bg-yellow-100 border-yellow-500",
                        spot.type === "large" && "bg-orange-100 border-orange-500",
                        spot.type === "standard" && "bg-gray-100 border-gray-500",
                      )}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-medium">{spot.id}</span>
                        {getSpotIcon(spot.type)}
                      </div>
                    </div>
                  )
                }),
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-100 border border-gray-500"></div>
              <span>Standard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-100 border border-blue-500"></div>
              <span>Handicap</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border border-green-500"></div>
              <span>Electric</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-500"></div>
              <span>Compact</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-100 border border-orange-500"></div>
              <span>Large</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-sm text-muted-foreground">
        <p>
          Total spots: {layout.length} / {totalSpots}
        </p>
        <p>
          Types: {layout.filter((s) => s.type === "standard").length} standard,
          {layout.filter((s) => s.type === "handicap").length} handicap,
          {layout.filter((s) => s.type === "electric").length} electric,
          {layout.filter((s) => s.type === "compact").length} compact,
          {layout.filter((s) => s.type === "large").length} large
        </p>
      </div>
    </div>
  )
}

