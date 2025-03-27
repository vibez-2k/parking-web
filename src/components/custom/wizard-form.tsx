"use client"

import * as React from "react"
import type { UseFormReturn } from "react-hook-form"
import type { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Wizard, WizardProgress, WizardButtons, useWizard } from "@/components/custom/wizard"
import { toast } from "@/components/custom/use-toast"
import { useFormPersistence } from "@/lib/use-form-persistence"
import { Loader2 } from "lucide-react"
import { QRCodeDisplay } from "@/components/custom/qr-code-display"
import { ProcessingAnimation } from "@/components/custom/processing-animation"

interface BookingData {
  reference: string
  date: string
  time: string
  duration: number
  price: number
  slotId: string
  name: string
}

interface WizardFormProps<T extends z.ZodType> {
  title: string
  description?: string
  schema: T
  defaultValues: z.infer<T>
  onSubmit: (values: z.infer<T>) => void
  children: React.ReactNode
  className?: string
  form: UseFormReturn<z.infer<T>>
  stepFields?: { [key: number]: string[] }
  persistenceKey?: string
  persistForm?: boolean
  isProcessing?: boolean
  bookingComplete?: boolean
  bookingData?: BookingData
}

export function WizardForm<T extends z.ZodType>({
  title,
  description,
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  form,
  stepFields = {},
  persistenceKey = "wizard-form-data",
  persistForm = true,
  isProcessing = false,
  bookingComplete = false,
  bookingData,
}: WizardFormProps<T>) {
  const { isLoading, hasPersistedData, saveFormData, clearPersistedData } = useFormPersistence(
    form,
    persistenceKey,
    persistForm,
  )

  const handleClearData = () => {
    clearPersistedData()
    form.reset(defaultValues)
    toast({
      title: "Form reset",
      description: "Your saved progress has been cleared.",
      variant: "info",
    })
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading your saved progress...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isProcessing) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Processing Your Booking</CardTitle>
          <CardDescription>Please wait while we process your payment and secure your parking spot.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-12">
          <ProcessingAnimation />
        </CardContent>
      </Card>
    )
  }

  if (bookingComplete && bookingData) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Booking Confirmed!</CardTitle>
          <CardDescription>Your parking spot has been reserved successfully.</CardDescription>
        </CardHeader>
        <CardContent>
          <QRCodeDisplay bookingData={bookingData} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {hasPersistedData && (
          <div className="mt-2 flex items-center justify-between">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
              Restored from saved progress
            </span>
            <button onClick={handleClearData} className="text-xs text-muted-foreground hover:text-destructive">
              Clear saved data
            </button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Wizard totalSteps={React.Children.count(children)}>
              <WizardFormContent
                onSubmit={onSubmit}
                form={form}
                stepFields={stepFields}
                onStepChange={saveFormData}
                clearPersistedData={clearPersistedData}
              >
                <WizardProgress className="mb-8" />
                {children}
              </WizardFormContent>
            </Wizard>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

interface WizardFormContentProps<T> {
  onSubmit: (values: T) => void
  form: UseFormReturn<T>
  stepFields: { [key: number]: string[] }
  children: React.ReactNode
  onStepChange?: () => void
  clearPersistedData?: () => void
}

function WizardFormContent<T>({
  onSubmit,
  form,
  stepFields,
  children,
  onStepChange,
  clearPersistedData,
}: WizardFormContentProps<T>) {
  const { setSubmittedData, currentStep } = useWizard()

  // Save form data when step changes
  React.useEffect(() => {
    if (onStepChange) {
      onStepChange()
    }
  }, [currentStep, onStepChange])

  // Handle form completion with visible steps
  const handleComplete = (visibleSteps: number[]) => {
    // Only validate fields from visible steps
    const fieldsToValidate = visibleSteps.flatMap((step) => stepFields[step] || [])

    // Custom submit handler that only validates visible fields
    const customSubmit = async () => {
      try {
        console.log("Submitting form with visible steps:", visibleSteps)
        console.log("Fields to validate:", fieldsToValidate)

        // If there are fields to validate, trigger validation
        if (fieldsToValidate.length > 0) {
          const isValid = await form.trigger(fieldsToValidate as any)
          console.log("Validation result:", isValid)

          if (!isValid) {
            toast({
              title: "Validation Error",
              description: "Please check your inputs and try again.",
              variant: "destructive",
            })
            return
          }
        }

        // Get the form values and submit
        const values = form.getValues()
        console.log("Form values:", values)

        // Store the submitted data in the wizard context
        setSubmittedData(values)

        // Call the onSubmit function directly
        onSubmit(values)
      } catch (error) {
        console.error("Form submission error:", error)
        toast({
          title: "Error",
          description: "There was a problem submitting the form.",
          variant: "destructive",
        })
      }
    }

    // Execute the submit handler
    customSubmit()
  }

  return (
    <>
      {children}
      <WizardButtons onComplete={handleComplete} completeText="Confirm & Pay" nextText="Continue" prevText="Back" />
    </>
  )
}

