"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, X } from "lucide-react"

interface SpecialRate {
  name: string
  rate: number
  description?: string
}

interface PricingConfigProps {
  currency: string
  onChange: (specialRates: SpecialRate[]) => void
}

export function PricingConfig({ currency, onChange }: PricingConfigProps) {
  const [specialRates, setSpecialRates] = useState<SpecialRate[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newRate, setNewRate] = useState<SpecialRate>({
    name: "",
    rate: 0,
    description: "",
  })

  const handleAddRate = () => {
    if (!newRate.name || newRate.rate <= 0) return

    const updatedRates = [...specialRates, newRate]
    setSpecialRates(updatedRates)
    onChange(updatedRates)

    // Reset form
    setNewRate({
      name: "",
      rate: 0,
      description: "",
    })
    setShowAddForm(false)
  }

  const handleRemoveRate = (index: number) => {
    const updatedRates = [...specialRates]
    updatedRates.splice(index, 1)
    setSpecialRates(updatedRates)
    onChange(updatedRates)
  }

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "USD":
        return "$"
      case "EUR":
        return "€"
      case "GBP":
        return "£"
      case "CAD":
        return "C$"
      case "AUD":
        return "A$"
      default:
        return "$"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Special Rates (Optional)</Label>
        {!showAddForm && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Special Rate</span>
          </Button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-muted/20 p-4 rounded-md space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="rate-name">Rate Name</Label>
              <Input
                id="rate-name"
                placeholder="Weekend Rate"
                value={newRate.name}
                onChange={(e) => setNewRate({ ...newRate, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate-amount">Rate Amount ({getCurrencySymbol(currency)})</Label>
              <Input
                id="rate-amount"
                type="number"
                min={0}
                step={0.01}
                placeholder="10.00"
                value={newRate.rate || ""}
                onChange={(e) => setNewRate({ ...newRate, rate: Number.parseFloat(e.target.value) })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate-description">Description (Optional)</Label>
            <Textarea
              id="rate-description"
              placeholder="Special rate for weekends or holidays"
              value={newRate.description || ""}
              onChange={(e) => setNewRate({ ...newRate, description: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={handleAddRate} disabled={!newRate.name || newRate.rate <= 0}>
              Add Rate
            </Button>
          </div>
        </div>
      )}

      {specialRates.length > 0 && (
        <div className="space-y-3">
          {specialRates.map((rate, index) => (
            <div key={index} className="flex items-center justify-between bg-muted/10 p-3 rounded-md">
              <div>
                <div className="font-medium">{rate.name}</div>
                <div className="text-sm text-muted-foreground">
                  {getCurrencySymbol(currency)}
                  {rate.rate.toFixed(2)}
                  {rate.description && ` - ${rate.description}`}
                </div>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveRate(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {specialRates.length === 0 && !showAddForm && (
        <div className="text-sm text-muted-foreground">
          No special rates configured. Add special rates for weekends, holidays, or events.
        </div>
      )}
    </div>
  )
}

