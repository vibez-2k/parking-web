"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { WizardForm } from "@/components/custom/wizard-form"
import { WizardStep } from "@/components/custom/wizard"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/custom/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { ParkingLayoutEditor } from "@/components/custom/parking-layout-editor"
import { ImageUploader } from "@/components/custom/image-uploader"
import { PricingConfig } from "@/components/custom/pricing-config"
import { BusinessHours } from "@/components/custom/business-hours"

// Define the form schema with Zod
const formSchema = z.object({
  ownerInfo: z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
    taxId: z.string().optional(),
  }),
  venueDetails: z.object({
    venueName: z.string().min(3, { message: "Venue name must be at least 3 characters." }),
    address: z.string().min(5, { message: "Please enter a valid address." }),
    city: z.string().min(2, { message: "City is required." }),
    state: z.string().min(2, { message: "State is required." }),
    zipCode: z.string().min(5, { message: "Please enter a valid ZIP code." }),
    description: z.string().min(20, { message: "Description must be at least 20 characters." }),
    venueType: z.enum(["garage", "lot", "street", "private", "other"], {
      required_error: "Please select a venue type.",
    }),
  }),
  parkingLayout: z.object({
    totalSpots: z.number().min(1, { message: "You must have at least 1 parking spot." }),
    handicapSpots: z.number().min(0),
    electricSpots: z.number().min(0),
    compactSpots: z.number().min(0),
    largeSpots: z.number().min(0),
    layout: z
      .array(
        z.object({
          id: z.string(),
          type: z.string(),
          row: z.number(),
          column: z.number(),
        }),
      )
      .optional(),
  }),
  pricing: z.object({
    baseRate: z.number().min(0, { message: "Base rate cannot be negative." }),
    hourlyRate: z.number().min(0, { message: "Hourly rate cannot be negative." }),
    dailyRate: z.number().min(0, { message: "Daily rate cannot be negative." }),
    weeklyRate: z.number().optional(),
    monthlyRate: z.number().optional(),
    specialRates: z
      .array(
        z.object({
          name: z.string(),
          rate: z.number(),
          description: z.string().optional(),
        }),
      )
      .optional(),
    currency: z.string().default("USD"),
  }),
  availability: z.object({
    isOpen24Hours: z.boolean().default(false),
    businessHours: z.array(
      z.object({
        day: z.string(),
        isOpen: z.boolean(),
        openTime: z.string().optional(),
        closeTime: z.string().optional(),
      }),
    ),
    specialHours: z
      .array(
        z.object({
          date: z.date(),
          isOpen: z.boolean(),
          openTime: z.string().optional(),
          closeTime: z.string().optional(),
          description: z.string().optional(),
        }),
      )
      .optional(),
  }),
  media: z.object({
    mainImage: z.string().optional(),
    additionalImages: z.array(z.string()).optional(),
    virtualTour: z.string().url().optional(),
  }),
  amenities: z.object({
    hasAttendant: z.boolean().default(false),
    hasSecurity: z.boolean().default(false),
    hasCameraSystem: z.boolean().default(false),
    isIndoor: z.boolean().default(false),
    hasCovered: z.boolean().default(false),
    hasLighting: z.boolean().default(false),
    hasEVCharging: z.boolean().default(false),
    hasCarWash: z.boolean().default(false),
    hasRestrooms: z.boolean().default(false),
    hasWheelchairAccess: z.boolean().default(false),
    otherAmenities: z.string().optional(),
  }),
  termsAndConditions: z.object({
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions.",
    }),
    acceptPaymentTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the payment terms.",
    }),
  }),
})

// Define the default values
const defaultValues = {
  ownerInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    taxId: "",
  },
  venueDetails: {
    venueName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    description: "",
    venueType: "lot" as const,
  },
  parkingLayout: {
    totalSpots: 20,
    handicapSpots: 2,
    electricSpots: 2,
    compactSpots: 5,
    largeSpots: 3,
    layout: [],
  },
  pricing: {
    baseRate: 2,
    hourlyRate: 5,
    dailyRate: 25,
    weeklyRate: 100,
    monthlyRate: 300,
    specialRates: [],
    currency: "USD",
  },
  availability: {
    isOpen24Hours: false,
    businessHours: [
      { day: "Monday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
      { day: "Tuesday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
      { day: "Wednesday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
      { day: "Thursday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
      { day: "Friday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
      { day: "Saturday", isOpen: true, openTime: "10:00", closeTime: "18:00" },
      { day: "Sunday", isOpen: true, openTime: "10:00", closeTime: "18:00" },
    ],
    specialHours: [],
  },
  media: {
    mainImage: "",
    additionalImages: [],
    virtualTour: "",
  },
  amenities: {
    hasAttendant: false,
    hasSecurity: false,
    hasCameraSystem: false,
    isIndoor: false,
    hasCovered: false,
    hasLighting: true,
    hasEVCharging: false,
    hasCarWash: false,
    hasRestrooms: false,
    hasWheelchairAccess: true,
    otherAmenities: "",
  },
  termsAndConditions: {
    acceptTerms: false,
    acceptPaymentTerms: false,
  },
}

// Define the fields for each step
const stepFields = {
  0: [
    "ownerInfo.firstName",
    "ownerInfo.lastName",
    "ownerInfo.email",
    "ownerInfo.phone",
    "ownerInfo.companyName",
    "ownerInfo.taxId",
  ],
  1: [
    "venueDetails.venueName",
    "venueDetails.address",
    "venueDetails.city",
    "venueDetails.state",
    "venueDetails.zipCode",
    "venueDetails.description",
    "venueDetails.venueType",
  ],
  2: [
    "parkingLayout.totalSpots",
    "parkingLayout.handicapSpots",
    "parkingLayout.electricSpots",
    "parkingLayout.compactSpots",
    "parkingLayout.largeSpots",
  ],
  3: [
    "pricing.baseRate",
    "pricing.hourlyRate",
    "pricing.dailyRate",
    "pricing.weeklyRate",
    "pricing.monthlyRate",
    "pricing.currency",
  ],
  4: ["availability.isOpen24Hours", "availability.businessHours"],
  5: ["media.mainImage", "media.additionalImages", "media.virtualTour"],
  6: [
    "amenities.hasAttendant",
    "amenities.hasSecurity",
    "amenities.hasCameraSystem",
    "amenities.isIndoor",
    "amenities.hasCovered",
    "amenities.hasLighting",
    "amenities.hasEVCharging",
    "amenities.hasCarWash",
    "amenities.hasRestrooms",
    "amenities.hasWheelchairAccess",
    "amenities.otherAmenities",
  ],
  7: ["termsAndConditions.acceptTerms", "termsAndConditions.acceptPaymentTerms"],
}

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [venueRegistered, setVenueRegistered] = useState(false)
  const [venueId, setVenueId] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })

  const validateStep = async (stepFields: string[]) => {
    const result = await form.trigger(stepFields as any)
    if (!result) {
      toast({
        title: "Validation Error",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      })
    }
    return result
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted successfully:", values)

    // Simulate API call to register venue
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate a venue ID
      const newVenueId = `VEN-${Math.floor(100000 + Math.random() * 900000)}`
      setVenueId(newVenueId)

      toast({
        title: "Venue Registered Successfully!",
        description: "Your parking venue has been added to our platform.",
        variant: "success",
      })

      setVenueRegistered(true)
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error registering your venue. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="  ">
      <WizardForm
        title="Register Your Parking Venue"
        description="Complete the following steps to add your parking venue to our platform."
        schema={formSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        className=" mx-auto"
        form={form}
        stepFields={stepFields}
        persistenceKey="venue-registration-wizard"
        persistForm={true}
        isProcessing={isSubmitting}
        venueRegistered={venueRegistered}
        venueData={{
          id: venueId,
          name: form.watch("venueDetails.venueName"),
          address: `${form.watch("venueDetails.address")}, ${form.watch("venueDetails.city")}, ${form.watch("venueDetails.state")} ${form.watch("venueDetails.zipCode")}`,
          totalSpots: form.watch("parkingLayout.totalSpots"),
          ownerName: `${form.watch("ownerInfo.firstName")} ${form.watch("ownerInfo.lastName")}`,
          companyName: form.watch("ownerInfo.companyName"),
        }}
      >
        {/* Step 1: Owner Information */}
        <WizardStep step={0} validator={() => validateStep(stepFields[0])} fieldNames={stepFields[0]}>
          <div className="space-y-2 ">
            <h2 className="text-xl font-semibold">Owner Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ownerInfo.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerInfo.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ownerInfo.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerInfo.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <FormField
                control={form.control}
                name="ownerInfo.companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Parking Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerInfo.taxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax ID (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="XX-XXXXXXX" {...field} />
                    </FormControl>
                    <FormDescription>For business tax purposes. This will not be displayed publicly.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </WizardStep>

        {/* Step 2: Venue Details */}
        <WizardStep step={1} validator={() => validateStep(stepFields[1])} fieldNames={stepFields[1]}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Venue Details</h2>
            <FormField
              control={form.control}
              name="venueDetails.venueName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Downtown Parking Garage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="venueDetails.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="venueDetails.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="venueDetails.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="NY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="venueDetails.zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="10001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="venueDetails.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your parking venue, including any special features or nearby attractions..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="venueDetails.venueType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select venue type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="garage">Parking Garage</SelectItem>
                      <SelectItem value="lot">Parking Lot</SelectItem>
                      <SelectItem value="street">Street Parking</SelectItem>
                      <SelectItem value="private">Private Driveway/Space</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </WizardStep>

        {/* Step 3: Parking Layout */}
        <WizardStep step={2} validator={() => validateStep(stepFields[2])} fieldNames={stepFields[2]}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Parking Layout</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="parkingLayout.totalSpots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Parking Spots</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parkingLayout.handicapSpots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Handicap Accessible Spots</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parkingLayout.electricSpots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Electric Vehicle Spots</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parkingLayout.compactSpots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compact Car Spots</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parkingLayout.largeSpots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Large Vehicle Spots (SUV/Truck)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6">
              <FormLabel>Parking Layout Editor</FormLabel>
              <FormDescription>
                Design your parking layout by adding and arranging spots. This will help customers find their way
                around.
              </FormDescription>
              <div className="mt-2">
                <ParkingLayoutEditor
                  totalSpots={form.watch("parkingLayout.totalSpots")}
                  handicapSpots={form.watch("parkingLayout.handicapSpots")}
                  electricSpots={form.watch("parkingLayout.electricSpots")}
                  compactSpots={form.watch("parkingLayout.compactSpots")}
                  largeSpots={form.watch("parkingLayout.largeSpots")}
                  onChange={(layout) => form.setValue("parkingLayout.layout", layout)}
                />
              </div>
            </div>
          </div>
        </WizardStep>

        {/* Step 4: Pricing */}
        <WizardStep step={3} validator={() => validateStep(stepFields[3])} fieldNames={stepFields[3]}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Pricing Information</h2>
            <FormField
              control={form.control}
              name="pricing.currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                      <SelectItem value="AUD">AUD (A$)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pricing.baseRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Rate (First Hour)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Initial rate for the first hour</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pricing.hourlyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hourly Rate</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Rate per additional hour</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pricing.dailyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Rate (24 hours)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pricing.weeklyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weekly Rate (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pricing.monthlyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Rate (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6">
              <PricingConfig
                currency={form.watch("pricing.currency")}
                onChange={(specialRates) => form.setValue("pricing.specialRates", specialRates)}
              />
            </div>
          </div>
        </WizardStep>

        {/* Step 5: Availability */}
        <WizardStep step={4} validator={() => validateStep(stepFields[4])} fieldNames={stepFields[4]}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Operating Hours</h2>
            <FormField
              control={form.control}
              name="availability.isOpen24Hours"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Open 24 Hours</FormLabel>
                    <FormDescription>
                      Check this if your parking venue is open 24 hours a day, 7 days a week
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {!form.watch("availability.isOpen24Hours") && (
              <div className="mt-6">
                <FormLabel>Business Hours</FormLabel>
                <FormDescription>Set your regular operating hours for each day of the week</FormDescription>
                <div className="mt-2">
                  <BusinessHours
                    value={form.watch("availability.businessHours")}
                    onChange={(hours) => form.setValue("availability.businessHours", hours)}
                  />
                </div>
              </div>
            )}
          </div>
        </WizardStep>

        {/* Step 6: Media Upload */}
        <WizardStep step={5} validator={() => validateStep(stepFields[5])} fieldNames={stepFields[5]}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Media Upload</h2>
            <FormField
              control={form.control}
              name="media.mainImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Venue Image</FormLabel>
                  <FormDescription>
                    Upload a high-quality image that showcases your parking venue. This will be the primary image shown
                    to customers.
                  </FormDescription>
                  <FormControl>
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                      maxSize={5}
                      acceptedTypes={["image/jpeg", "image/png"]}
                      aspectRatio="16:9"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="media.additionalImages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Images (Optional)</FormLabel>
                  <FormDescription>
                    Upload up to 5 additional images showing different areas or features of your venue
                  </FormDescription>
                  <FormControl>
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                      maxSize={5}
                      maxFiles={5}
                      multiple={true}
                      acceptedTypes={["image/jpeg", "image/png"]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="media.virtualTour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Virtual Tour URL (Optional)</FormLabel>
                  <FormDescription>
                    If you have a virtual tour or 360° view of your venue, paste the URL here
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="https://example.com/virtual-tour" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </WizardStep>

        {/* Step 7: Amenities */}
        <WizardStep step={6} validator={() => validateStep(stepFields[6])} fieldNames={stepFields[6]}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Amenities & Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amenities.hasAttendant"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Parking Attendant</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.hasSecurity"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Security Personnel</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.hasCameraSystem"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Security Cameras</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.isIndoor"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Indoor Parking</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.hasCovered"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Covered Parking</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.hasLighting"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Well-lit Area</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.hasEVCharging"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>EV Charging Stations</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.hasCarWash"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Car Wash Service</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.hasRestrooms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Restrooms</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities.hasWheelchairAccess"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Wheelchair Accessible</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="amenities.otherAmenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Amenities (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any other amenities or special features of your parking venue..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </WizardStep>

        {/* Step 8: Terms and Conditions */}
        <WizardStep step={7} validator={() => validateStep(stepFields[7])} fieldNames={stepFields[7]}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Terms and Conditions</h2>
            <div className="bg-muted/30 p-2 rounded-md h-48 overflow-y-auto text-sm">
              <h3 className="font-medium mb-2">Venue Owner Agreement</h3>
              <p className="mb-2">
                By registering your parking venue on our platform, you agree to the following terms and conditions:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>You confirm that you are the legal owner or authorized representative of this parking venue.</li>
                <li>
                  You agree to maintain accurate information about your venue, including availability and pricing.
                </li>
                <li>
                  You understand that our platform charges a 10% service fee on all bookings made through the platform.
                </li>
                <li>
                  You agree to honor all bookings made through our platform and provide the services as described.
                </li>
                <li>You will maintain appropriate insurance coverage for your parking venue.</li>
                <li>
                  You understand that payments will be processed by our platform and disbursed to you on a bi-weekly
                  basis.
                </li>
                <li>You agree to our cancellation and refund policies as outlined in our full terms of service.</li>
              </ol>
            </div>

            <FormField
              control={form.control}
              name="termsAndConditions.acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I accept the terms and conditions</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-muted/30 p-4 rounded-md h-32 overflow-y-auto text-sm mt-6">
              <h3 className="font-medium mb-2">Payment Terms</h3>
              <p className="mb-2">By accepting these payment terms, you agree to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Accept payments through our platform's payment processing system.</li>
                <li>A service fee of 10% on all bookings, which will be deducted before funds are disbursed to you.</li>
                <li>Payments will be processed and transferred to your designated bank account every two weeks.</li>
                <li>You are responsible for any applicable taxes on the income received from bookings.</li>
              </ul>
            </div>

            <FormField
              control={form.control}
              name="termsAndConditions.acceptPaymentTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I accept the payment terms</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </WizardStep>
      </WizardForm>
    </main>
  )
}

