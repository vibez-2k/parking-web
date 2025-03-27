import PremiumProductCard from "@/components/custom/PremiumProductCard"

const venues = [
    {
        name: "Parking Venue 1",
        address: "123 Main St, Anytown, USA",
        image: "/images/cctv3.png",
    },
    {
        name: "Parking Venue 2",
        address: "456 Elm St, Othertown, USA",
        image: "/images/cctv4.png",
    },
    {
        name: "Parking Venue 3",
        address: "789 Oak St, Thistown, USA",
        image: "/images/cctv1.png",
    },
    {
        name: "Parking Venue 4",
        address: "321 Pine St, That town, USA",
        image: "/images/cctv2.png",
    },

]



export default function Home() {
    return (
        <main >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {venues.map((venue, index) => (
                    <PremiumProductCard key={index} name={venue.name} email={venue.address} type={"venue"} basePrice={4999} image={venue.image} />))}
            </div>
        </main>
    )
}

