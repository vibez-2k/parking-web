import PremiumProductCard from "@/components/custom/PremiumProductCard"
const venues = [
    {
        name: "Parking Venue 1",
        address: "123 Main St, Anytown, USA",
        image: "/images/cctv3.png",
        slots: 20,
        capacity:100
    },
    {
        name: "Parking Venue 2",
        address: "456 Elm St, Othertown, USA",
        image: "/images/cctv4.png",
        slots: 30,
        capacity:180
    },
    {
        name: "Parking Venue 3",
        address: "789 Oak St, Thistown, USA",
        image: "/images/cctv1.png",
        slots: 25,
        capacity:600
    },
    {
        name: "Parking Venue 4",
        address: "321 Pine St, That town, USA",
        image: "/images/cctv2.png",
        slots: 35,
        capacity:600
    },
]

export default function Home() {
    return (
        <main className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {venues.map((venue, index) => (
                    <div className="w-full flex justify-center " key={index}>
                        <PremiumProductCard 
                            name={venue.name} 
                            venue={venue} 
                            email={venue.address} 
                            type={"User"} 
                            basePrice={4999} 
                            image={venue.image}
                        />
                    </div>
                ))}
            </div>
        </main>
    )
}
