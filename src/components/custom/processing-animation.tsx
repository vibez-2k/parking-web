"use client"

import { useEffect, useState } from "react"
import { CheckCircle, CreditCard, Car, Calendar } from "lucide-react"

export function ProcessingAnimation() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 3) {
        setStep(step + 1)
      }
    }, 700)

    return () => clearTimeout(timer)
  }, [step])

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-8">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
      </div>

      <div className="space-y-4 w-full max-w-xs">
        <div
          className={`flex items-center gap-3 transition-all duration-300 ${step >= 0 ? "opacity-100" : "opacity-30"}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${step >= 0 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            <CreditCard className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Verifying payment</p>
            {step >= 0 && (
              <div className="h-1 bg-primary/20 mt-1 overflow-hidden rounded-full">
                <div className={`h-full bg-primary transition-all duration-700 ${step > 0 ? "w-full" : "w-0"}`}></div>
              </div>
            )}
          </div>
          {step > 0 && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>

        <div
          className={`flex items-center gap-3 transition-all duration-300 ${step >= 1 ? "opacity-100" : "opacity-30"}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            <Calendar className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Reserving time slot</p>
            {step >= 1 && (
              <div className="h-1 bg-primary/20 mt-1 overflow-hidden rounded-full">
                <div className={`h-full bg-primary transition-all duration-700 ${step > 1 ? "w-full" : "w-0"}`}></div>
              </div>
            )}
          </div>
          {step > 1 && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>

        <div
          className={`flex items-center gap-3 transition-all duration-300 ${step >= 2 ? "opacity-100" : "opacity-30"}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            <Car className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Confirming parking spot</p>
            {step >= 2 && (
              <div className="h-1 bg-primary/20 mt-1 overflow-hidden rounded-full">
                <div className={`h-full bg-primary transition-all duration-700 ${step > 2 ? "w-full" : "w-0"}`}></div>
              </div>
            )}
          </div>
          {step > 2 && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>
      </div>

      <p className="text-sm text-muted-foreground animate-pulse">
        {step < 3 ? "Please wait while we process your booking..." : "Almost done!"}
      </p>
    </div>
  )
}

