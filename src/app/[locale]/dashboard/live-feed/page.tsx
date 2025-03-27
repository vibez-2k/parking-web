"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
    Building2,
    Camera,
    ChevronLeft,
    ChevronRight,
    Download,
    Calendar,
    Home,
    Store,
    Warehouse,
    Play
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CCTVVideoUI() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentCamera, setCurrentCamera] = useState("Front Entrance")
    const [currentVenue, setCurrentVenue] = useState("Headquarters")
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const venues = [
        { id: "headquarters", name: "Headquarters", icon: Building2, cameras: 5 },
        { id: "warehouse", name: "Warehouse", icon: Warehouse, cameras: 8 },
        { id: "retail-store", name: "Retail Store", icon: Store, cameras: 4 },
        { id: "branch-office", name: "Branch Office", icon: Home, cameras: 3 },
        { id: "parking-garage", name: "Parking Garage", icon: Building2, cameras: 6 },
        { id: "distribution-center", name: "Distribution Center", icon: Warehouse, cameras: 10 },
        { id: "data-center", name: "Data Center", icon: Building2, cameras: 12 },
    ]

    const cameras = [
        "Front Entrance", 
        "Back Door", 
        "Parking Lot", 
        "Lobby", 
        "Hallway 1"
    ]

    return (
        <div className="flex h-screen bg-gray-50">
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b p-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{currentVenue}</h1>
                        <p className="text-sm text-gray-500">Live Video Monitoring</p>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                        <Button variant="outline" size="sm">
                            <Calendar className="mr-2 h-4 w-4" /> Archive
                        </Button>
                    </div>
                </div>

                {/* Video and Controls Container */}
                <div className="flex-1 p-6 overflow-auto flex flex-col space-y-6">
                    {/* Main Video Feed */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-black rounded-xl overflow-hidden shadow-2xl"
                        >
                            <div className="aspect-video relative">
                                {isPlaying ? (
                                    <iframe
                                        src={`https://player.vimeo.com/video/1055784280?autoplay=1&title=0&byline=0&portrait=0`}
                                        className="w-full h-full"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div 
                                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                        onClick={() => setIsPlaying(true)}
                                    >
                                        <Image
                                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lQJe60OxxGongNvLeFeJWGT3Gz0Rra.png"
                                            alt="Camera preview"
                                            fill
                                            className="object-cover"
                                            priority
                                            unoptimized
                                        />
                                        <Button 
                                            variant="default" 
                                            size="lg" 
                                            className="absolute bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                                        >
                                            <Play className="mr-2" /> Play Live Feed
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Camera Selection */}
                        <div className="bg-white border rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <Camera className="h-5 w-5 text-gray-500" />
                                    <h3 className="font-semibold">Camera Selection</h3>
                                </div>
                                <Select value={currentCamera} onValueChange={setCurrentCamera}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Camera" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cameras.map(camera => (
                                            <SelectItem key={camera} value={camera}>
                                                {camera}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Other Camera Feeds */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Other Camera Feeds</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {cameras.filter(cam => cam !== currentCamera).map((camera) => (
                                <div 
                                    key={camera} 
                                    className="cursor-pointer hover:scale-105 transition"
                                    onClick={() => setCurrentCamera(camera)}
                                >
                                    <div className="bg-black rounded-lg overflow-hidden shadow-md">
                                        <div className="aspect-video relative">
                                            <Image
                                                src="/placeholder.svg?height=180&width=320"
                                                alt={`${camera} feed`}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                                                <p className="text-white text-sm truncate">{camera}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Sidebar */}
            <div 
                className={`
                    bg-white border-r shadow-lg transition-all duration-300 
                    ${sidebarOpen ? 'w-64' : 'w-20'}
                    hidden md:block overflow-hidden
                `}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    {sidebarOpen && (
                        <h2 className="text-xl font-bold text-gray-800">CCTV Monitoring</h2>
                    )}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setSidebarOpen(!sidebarOpen)} 
                        className="ml-auto"
                    >
                        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
                    </Button>
                </div>

                <div className="p-4">
                    <div className={`
                        text-xs font-semibold text-gray-500 mb-4 
                        ${sidebarOpen ? 'opacity-100' : 'opacity-0'}
                    `}>
                        VENUES
                    </div>

                    <div className="space-y-4">
                        {venues.slice(0, 4).map((venue) => (
                            <div 
                                key={venue.id} 
                                className={`
                                    cursor-pointer rounded-lg overflow-hidden 
                                    transition hover:scale-105 
                                    ${currentVenue === venue.name ? 'ring-2 ring-blue-500' : ''}
                                `}
                                onClick={() => setCurrentVenue(venue.name)}
                            >
                                <div className="relative">
                                    <Image 
                                        src="/images/cctv1.png" 
                                        width={320} 
                                        height={180} 
                                        alt={`${venue.name} preview`}
                                        className="w-full h-24 object-cover"
                                    />
                                    {sidebarOpen && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                                            <p className="text-white text-sm truncate">{venue.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}