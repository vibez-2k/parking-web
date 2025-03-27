"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { Calendar, Clock, Car, CreditCard, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookingData {
  reference: string
  date: string
  time: string
  duration: number
  price: number
  slotId: string
  name: string
}

interface QRCodeDisplayProps {
  bookingData: BookingData
}

export function QRCodeDisplay({ bookingData }: QRCodeDisplayProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [showAnimation, setShowAnimation] = useState(true)

  useEffect(() => {
    // Generate QR code with booking reference
    const generateQRCode = async () => {
      try {
        // In a real app, this would be a URL to your booking system
        const qrData = JSON.stringify({
          ref: bookingData.reference,
          slot: bookingData.slotId,
          time: bookingData.time,
          date: bookingData.date,
        })

        const url = await QRCode.toDataURL(qrData, {
          width: 240,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        })

        setQrCodeUrl(url)

        // Show animation for 1.5 seconds
        setTimeout(() => {
          setShowAnimation(false)
        }, 1500)
      } catch (error) {
        console.error("Error generating QR code:", error)
      }
    }

    generateQRCode()
  }, [bookingData])

  // Simulate downloading the QR code
  const handleDownload = () => {
    if (!qrCodeUrl) return

    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `parking-${bookingData.reference}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Simulate sharing the booking
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Parking Reservation",
        text: `I've booked parking spot ${bookingData.slotId} for ${bookingData.date} at ${bookingData.time}. Reference: ${bookingData.reference}`,
      })
    } else {
      alert("Sharing is not supported on this browser")
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        {showAnimation ? (
          <div className="w-60 h-60 flex items-center justify-center bg-muted/20 rounded-lg">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4"></div>
              <p className="text-sm text-muted-foreground">Generating QR Code...</p>
            </div>
          </div>
        ) : (
          <div className="w-60 h-60 flex items-center justify-center bg-white p-2 rounded-lg shadow-sm animate-fade-in">
            {qrCodeUrl && <img src={qrCodeUrl || "/placeholder.svg"} alt="Booking QR Code" className="max-w-full" />}
          </div>
        )}
      </div>

      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold">{bookingData.reference}</h3>
        <p className="text-sm text-muted-foreground">Present this QR code when you arrive at the parking facility</p>
      </div>

      <div className="w-full max-w-sm bg-muted/20 rounded-lg p-4 space-y-3">
        <h4 className="font-medium">Booking Details</h4>

        <div className="grid grid-cols-[24px_1fr] gap-x-3 gap-y-2 items-center">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span>{bookingData.date}</span>

          <Clock className="h-5 w-5 text-muted-foreground" />
          <span>
            {bookingData.time} ({bookingData.duration} {bookingData.duration === 1 ? "hour" : "hours"})
          </span>

          <Car className="h-5 w-5 text-muted-foreground" />
          <span>Parking Spot {bookingData.slotId}</span>

          <CreditCard className="h-5 w-5 text-muted-foreground" />
          <span>${bookingData.price.toFixed(2)} (Paid)</span>
        </div>
      </div>

      <div className="flex gap-3 w-full max-w-sm">
        <Button variant="outline" className="flex-1" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

