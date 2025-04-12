"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation";
import { z } from "zod"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { WizardForm } from "@/components/custom/wizard-form"
import { WizardStep } from "@/components/custom/wizard"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/custom/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ParkingSlots } from "@/components/custom/parking-slots"
import { PaymentForm } from "@/components/custom/payment-form"


interface ProductCardProps {
    name: string
    basePrice: number
    image: string
    email: string
    type: string
}

interface ColorOption {
    name: string
    color: string
    priceAdjustment: number
}



// Define the form schema with Zod
const formSchema = z.object({
    contactInfo: z.object({
        firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
        lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
        email: z.string().email({ message: "Please enter a valid email address." }),
        phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    }),
    vehicleInfo: z.object({
        licensePlate: z.string().min(2, { message: "License plate is required." }),
        vehicleType: z.enum(["compact", "sedan", "suv", "truck"], {
            required_error: "Please select a vehicle type.",
        }),
    }),
    bookingDetails: z.object({
        date: z.date({ required_error: "Please select a date." }),
        startTime: z.string({ required_error: "Please select a start time." }),
        duration: z.number().min(1, { message: "Duration must be at least 1 hour." }).max(24),
    }),
    slotSelection: z.object({
        slotId: z.string({ required_error: "Please select a parking slot." }),
    }),
    paymentDetails: z.object({
        cardNumber: z.string().min(16, { message: "Please enter a valid card number." }).max(19),
        cardholderName: z.string().min(2, { message: "Cardholder name is required." }),
        expiryDate: z.string().min(5, { message: "Please enter a valid expiry date." }),
        cvv: z.string().min(3, { message: "Please enter a valid CVV." }).max(4),
        savePaymentInfo: z.boolean().default(false),
    }),
    termsAndConditions: z.object({
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions.",
        }),
    }),
})

// Define the default values
const defaultValues = {
    contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    },
    vehicleInfo: {
        licensePlate: "",
        vehicleType: "sedan" as const,
    },
    bookingDetails: {
        date: new Date(),
        startTime: "10:00",
        duration: 2,
    },
    slotSelection: {
        slotId: "",
    },
    paymentDetails: {
        cardNumber: "",
        cardholderName: "",
        expiryDate: "",
        cvv: "",
        savePaymentInfo: false,
    },
    termsAndConditions: {
        acceptTerms: false,
    },
}

// Define the fields for each step
const stepFields = {
    0: ["contactInfo.firstName", "contactInfo.lastName", "contactInfo.email", "contactInfo.phone"],
    1: ["vehicleInfo.licensePlate", "vehicleInfo.vehicleType"],
    2: ["bookingDetails.date", "bookingDetails.startTime", "bookingDetails.duration"],
    3: ["slotSelection.slotId"],
    4: [
        "paymentDetails.cardNumber",
        "paymentDetails.cardholderName",
        "paymentDetails.expiryDate",
        "paymentDetails.cvv",
        "paymentDetails.savePaymentInfo",
    ],
    5: ["termsAndConditions.acceptTerms"],
}

// Available time slots
const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
]


export default function PremiumProductCard({ name, basePrice, venue, email, image, type }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [selectedColor, setSelectedColor] = useState<ColorOption>({
        name: "Standard Glass",
        color: "#ffffff",
        priceAdjustment: 0,
    })
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const router = useRouter();

    const handleClick = () => {
        if (type === "User") {
            setIsPopupOpen(true);
        } else if (type === "venue") {
            router.push("/dashboard/venue-details");
        }
    };


    const [isProcessing, setIsProcessing] = useState(false)
    const [bookingComplete, setBookingComplete] = useState(false)
    const [bookingReference, setBookingReference] = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: "onChange",
    })

    const selectedDate = useWatch({
        control: form.control,
        name: "bookingDetails.date",
    })

    const selectedTime = useWatch({
        control: form.control,
        name: "bookingDetails.startTime",
    })

    const selectedDuration = useWatch({
        control: form.control,
        name: "bookingDetails.duration",
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

        // Simulate payment processing
        setIsProcessing(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // Generate a booking reference
            const reference = `PK-${Math.floor(100000 + Math.random() * 900000)}`
            setBookingReference(reference)

            toast({
                title: "Payment Successful!",
                description: "Your parking slot has been booked.",
                variant: "success",
            })

            setBookingComplete(true)
        } catch (error) {
            toast({
                title: "Payment Failed",
                description: "There was an error processing your payment. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsProcessing(false)
        }
    }

    // Calculate the total price based on duration
    const calculatePrice = () => {
        const baseRate = 5 // $5 per hour
        return baseRate * (selectedDuration || 0)
    }




    return (
        <>
            <motion.div
                className="relative w-full text-black rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Content container */}
                <div className="relative flex flex-col p-4">
                    {/* Product image */}
                    <motion.div
                        className="w-full aspect-square relative rounded-lg overflow-hidden mb-4"
                        initial={{ scale: 1 }}
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src={image || "/placeholder.svg?height=250&width=250"}
                            alt={name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                        {isHovered && venue?.slot && (
                            <div className=" absolute z-20 bottom-0 left-1/2 right-0 bg-white bg-opacity-75 px-2 py-1 text-sm font-medium">
                                {venue.slots} cae
                            </div>
                        )}
                    </motion.div>

                    {/* Product info */}
                    <h2 className="text-lg font-semibold mb-1">
                        {name}
                        <div className="flex items-center mb-1">
                            <span className="bg-green-400 text-white text-xs font-semibold mr-2 px-2 py-1 rounded-full">{venue?.slots}</span>/
                            <span className="text-primary text-base">{venue?.capacity}</span>
                        </div>
                    </h2>
                    <p className="text-xs font-medium mb-3">
                        Email: {email}
                    </p>

                    {/* Verify / Book Button */}
                    <motion.button
                        className="w-full py-2 bg-blue-600 rounded-lg text-white font-semibold transition-all duration-300 hover:bg-blue-700"
                        whileHover={{ scale: 1.03, boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleClick}
                    >
                        {type === "User" ? "Book!" : "Verify"}
                    </motion.button>
                </div>
            </motion.div>

            {/* Popup Modal */}
            {isPopupOpen && (
                <div className="fixed z-10 top-0 left-0 w-full h-screen flex items-start justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
                    <WizardForm
                        title="Parking Reservation"
                        description="Book your parking spot in just a few steps."
                        schema={formSchema}
                        defaultValues={defaultValues}
                        onSubmit={onSubmit}
                        className="w-full max-w-2xl mx-auto relative text-black bg-white rounded-lg shadow-xl p-4 sm:p-6 mt-4 mb-4 max-h-[90vh] overflow-y-auto"
                        form={form}
                        stepFields={stepFields}
                        persistenceKey="parking-booking-wizard"
                        persistForm={true}
                        isProcessing={isProcessing}
                        bookingComplete={bookingComplete}
                        bookingData={{
                            reference: bookingReference,
                            date: selectedDate ? format(selectedDate, "EEEE, MMMM do, yyyy") : "",
                            time: selectedTime || "",
                            duration: selectedDuration || 0,
                            price: calculatePrice(),
                            slotId: form.watch("slotSelection.slotId"),
                            name: `${form.watch("contactInfo.firstName")} ${form.watch("contactInfo.lastName")}`,
                        }}
                    >
                        <button
                            className="absolute top-2 right-2 sm:top-5 sm:right-5 text-red-500 p-2"
                            onClick={() => setIsPopupOpen(false)}
                        >
                            <X className="h-6 w-6"/>
                        </button>

                        {/* Step 1: Contact Information */}
                        <WizardStep step={0} validator={() => validateStep(stepFields[0])} fieldNames={stepFields[0]}>
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Contact Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <FormField
                                        control={form.control}
                                        name="contactInfo.firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John" {...field} className="w-full" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="contactInfo.lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Doe" {...field} className="w-full" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="contactInfo.email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="john.doe@example.com" {...field} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="contactInfo.phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input type="tel" placeholder="(123) 456-7890" {...field} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </WizardStep>

                        {/* Step 2: Vehicle Information */}
                        <WizardStep step={1} validator={() => validateStep(stepFields[1])} fieldNames={stepFields[1]}>
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Vehicle Information</h2>
                                <FormField
                                    control={form.control}
                                    name="vehicleInfo.licensePlate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>License Plate</FormLabel>
                                            <FormControl>
                                                <Input placeholder="ABC123" {...field} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="vehicleInfo.vehicleType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vehicle Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select vehicle type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="compact">Compact</SelectItem>
                                                    <SelectItem value="sedan">Sedan</SelectItem>
                                                    <SelectItem value="suv">SUV</SelectItem>
                                                    <SelectItem value="truck">Truck</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </WizardStep>

                        {/* Step 3: Booking Details */}
                        <WizardStep step={2} validator={() => validateStep(stepFields[2])} fieldNames={stepFields[2]}>
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Booking Details</h2>
                                <FormField
                                    control={form.control}
                                    name="bookingDetails.date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                                        >
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                                                        }
                                                        initialFocus
                                                        className="rounded-md border"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bookingDetails.startTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start Time</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select start time" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {timeSlots.map((time) => (
                                                        <SelectItem key={time} value={time}>
                                                            {time}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bookingDetails.duration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration (hours)</FormLabel>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number.parseInt(value))}
                                                defaultValue={field.value.toString()}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select duration" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {[1, 2, 3, 4, 5, 6, 8, 12, 24].map((hours) => (
                                                        <SelectItem key={hours} value={hours.toString()}>
                                                            {hours} {hours === 1 ? "hour" : "hours"}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>Total cost: ${calculatePrice().toFixed(2)}</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </WizardStep>

                        {/* Step 4: Slot Selection */}
                        <WizardStep step={3} validator={() => validateStep(stepFields[3])} fieldNames={stepFields[3]}>
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Select Parking Slot</h2>
                                <FormField
                                    control={form.control}
                                    name="slotSelection.slotId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Available Slots</FormLabel>
                                            <FormControl>
                                                <div className="w-full overflow-x-auto">
                                                    <ParkingSlots
                                                        selectedSlot={field.value}
                                                        onSelectSlot={field.onChange}
                                                        date={selectedDate}
                                                        startTime={selectedTime}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormDescription>Select an available parking slot for your reservation</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </WizardStep>

                        {/* Step 5: Payment Details */}
                        <WizardStep step={4} validator={() => validateStep(stepFields[4])} fieldNames={stepFields[4]}>
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto px-2">
                                <h2 className="text-lg font-semibold sticky top-0 bg-white py-2">Payment Details</h2>
                                <div className="bg-muted/30 p-3 rounded-md mb-4">
                                    <h3 className="font-medium text-sm mb-2">Booking Summary</h3>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <span className="text-muted-foreground">Date:</span>
                                        <span>{selectedDate ? format(selectedDate, "MMM d, yyyy") : ""}</span>

                                        <span className="text-muted-foreground">Time:</span>
                                        <span>{selectedTime}</span>

                                        <span className="text-muted-foreground">Duration:</span>
                                        <span>
                                            {selectedDuration} {selectedDuration === 1 ? "hour" : "hours"}
                                        </span>

                                        <span className="text-muted-foreground">Slot:</span>
                                        <span>{form.watch("slotSelection.slotId")}</span>

                                        <span className="text-muted-foreground font-medium">Total:</span>
                                        <span className="font-medium">${calculatePrice().toFixed(2)}</span>
                                    </div>
                                </div>

                                <PaymentForm form={form} />

                                <FormField
                                    control={form.control}
                                    name="paymentDetails.savePaymentInfo"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <div className="space-y-0.5 leading-none">
                                                <FormLabel className="text-sm">Save payment information for future bookings</FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </WizardStep>

                        {/* Step 6: Terms and Conditions */}
                        <WizardStep step={5} validator={() => validateStep(stepFields[5])} fieldNames={stepFields[5]}>
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Terms and Conditions</h2>
                                <div className="bg-muted/30 p-4 rounded-md h-48 overflow-y-auto text-sm">
                                    <h3 className="font-medium mb-2">Parking Terms of Service</h3>
                                    <p className="mb-2">By using our parking services, you agree to the following terms and conditions:</p>
                                    <ol className="list-decimal pl-5 space-y-2">
                                        <li>Parking is at your own risk. We are not responsible for any damage or theft.</li>
                                        <li>Please arrive on time. Your spot will only be reserved for 15 minutes after your booked time.</li>
                                        <li>Cancellations must be made at least 2 hours before your booking time for a full refund.</li>
                                        <li>You must park within the designated spot and follow all posted signs and instructions.</li>
                                        <li>Vehicles must be removed by the end of the booked duration to avoid additional charges.</li>
                                        <li>A fee of $10 per hour will be charged for exceeding your booked duration.</li>
                                        <li>The QR code must be presented upon entry and exit.</li>
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
                                                <FormLabel className="text-sm">I accept the terms and conditions</FormLabel>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </WizardStep>
                    </WizardForm>
                </div>
            )}
        </>
    );
}
