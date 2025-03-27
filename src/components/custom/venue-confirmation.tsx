"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Building, MapPin, Car, Share2, ArrowRight, Copy } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface VenueData {
  id: string
  name: string
  address: string
  totalSpots: number
  ownerName: string
  companyName: string
}

interface VenueConfirmationProps {
  venueData: VenueData
}

export function VenueConfirmation({ venueData }: VenueConfirmationProps) {
  const [activeTab, setActiveTab] = useState<"confirmation" | "next-steps">("confirmation")

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: message,
      variant: "success",
    })
  }

  // Simulate sharing the venue
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${venueData.name} - Parking Venue`,
        text: `Check out ${venueData.name} at ${venueData.address}. Venue ID: ${venueData.id}`,
      })
    } else {
      copyToClipboard(
        `${venueData.name} - ${venueData.address} - Venue ID: ${venueData.id}`,
        "Venue details copied to clipboard",
      )
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Registration Complete!</h2>
        <p className="text-muted-foreground">Your parking venue has been successfully registered on our platform.</p>
      </div>

      <div className="w-full max-w-md">
        <div className="flex border-b mb-4">
          <button
            className={`pb-2 px-4 text-sm font-medium ${
              activeTab === "confirmation" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("confirmation")}
          >
            Confirmation
          </button>
          <button
            className={`pb-2 px-4 text-sm font-medium ${
              activeTab === "next-steps" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("next-steps")}
          >
            Next Steps
          </button>
        </div>

        {activeTab === "confirmation" && (
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Venue ID</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{venueData.id}</span>
                      <button
                        onClick={() => copyToClipboard(venueData.id, "Venue ID copied to clipboard")}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Venue Details</div>
                    <div className="text-sm">{venueData.name}</div>
                    <div className="text-sm text-muted-foreground">{venueData.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Parking Capacity</div>
                    <div className="text-sm">{venueData.totalSpots} total spots</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Owner Information</div>
                    <div className="text-sm">{venueData.ownerName}</div>
                    <div className="text-sm text-muted-foreground">{venueData.companyName}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "next-steps" && (
          <div className="space-y-4">
            <div className="bg-muted/20 p-4 rounded-md">
              <h3 className="font-medium mb-2">What's Next?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                    1
                  </div>
                  <div>
                    <span className="font-medium">Complete your profile</span>
                    <p className="text-sm text-muted-foreground">Add payment information to receive booking payments</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                    2
                  </div>
                  <div>
                    <span className="font-medium">Upload more photos</span>
                    <p className="text-sm text-muted-foreground">Venues with more photos get 3x more bookings</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                    3
                  </div>
                  <div>
                    <span className="font-medium">Set special rates</span>
                    <p className="text-sm text-muted-foreground">Configure rates for holidays and events</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                    4
                  </div>
                  <div>
                    <span className="font-medium">Install our management app</span>
                    <p className="text-sm text-muted-foreground">Manage bookings on the go with our mobile app</p>
                  </div>
                </li>
              </ul>
            </div>

            <Button className="w-full">
              Go to Venue Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-3 w-full max-w-md mt-4">
        <Button variant="outline" className="flex-1" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share Venue
        </Button>
        <Button variant="outline" className="flex-1" onClick={() => window.location.reload()}>
          Register Another Venue
        </Button>
      </div>
    </div>
  )
}

