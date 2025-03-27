import ExpandingCard from "@/components/custom/ExpandingCard"

const cards = [
  {
    title: "Parking Venue 1",
    description:
      "This parking venue is close to the city center and offers easy access to public transportation. It has a total of 100 parking spots.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Parking Venue 2",
    description:
      "Parking Venue 2 has a total of 200 parking spots and is located in a quiet neighborhood. It is a great option for those who want to avoid the hustle and bustle of the city center.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Parking Venue 3",
    description:
      "Parking Venue 3 is a great option for those who want to be close to the city center but also want to avoid the high prices of the city center. It has a total of 150 parking spots.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Parking Venue 4",
    description:
      "Parking Venue 4 is a great option for those who want to be close to the city center and also want to be close to the main attractions. It has a total of 250 parking spots.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Parking Venue 5",
    description:
      "Parking Venue 5 is a great option for those who want to be close to the city center and also want to be close to the main attractions. It has a total of 300 parking spots.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Parking Venue 6",
    description:
      "Parking Venue 6 is a great option for those who want to be close to the city center and also want to be close to the main attractions. It has a total of 350 parking spots.",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">View Live Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <ExpandingCard  key={index} title={card.title} description={card.description} image={`/images/cctv${(index % 3) + 1}.png`} />
        ))}
      </div>
    </main>
  )
}

