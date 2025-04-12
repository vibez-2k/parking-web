import PremiumProductCard from "@/components/custom/PremiumProductCard"

const users = [
    {
        name: "Ethan Walker",
        email: "ethan.walker@example.com",
        image: "https://i.pravatar.cc/200?img=1",
    },
    {
        name: "Sophia Martinez",
        email: "sophia.martinez@example.com",
        image: "https://i.pravatar.cc/200?img=2",
    },
    {
        name: "Liam Anderson",
        email: "liam.anderson@example.com",
        image: "https://i.pravatar.cc/200?img=3",
    },
    {
        name: "Olivia Thompson",
        email: "olivia.thompson@example.com",
        image: "https://i.pravatar.cc/200?img=4",
    },
    {
        name: "Benjamin Carter",
        email: "benjamin.carter@example.com",
        image: "https://i.pravatar.cc/200?img=5",
    },
    {
        name: "Ajay c k",
        email: "ava.robinson@example.com",
        image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
]



export default function Home() {
    return (
        <main >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {users.map((user, index) => (
                    <PremiumProductCard key={index} name={user.name} email={user.email} basePrice={4999} image={user.image} />))}
            </div>
        </main>
    )
}

