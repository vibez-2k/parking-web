import Image from "next/image"
import { Search, Heart, Clock, Instagram, Facebook, ChevronDown, ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative w-full h-[250px] md:h-[350px] overflow-hidden">
          <Image
            src="/images/cctv2.png"
            alt="Facial treatment"
            width={1200}
            height={350}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Business Profile */}
        <div className="container mx-auto px-4 -mt-16 relative z-5">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src="https://i.pravatar.cc/200?img=7"
                  alt="SSKIN COPENHAGEN"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute top-0 right-0 text-favorite">
                <Heart className="h-5 w-5 fill-favorite" />
              </button>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-wide">SURYA V</h1>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-[#fcd010] fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-sm font-medium">5.0</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#feeb9c] text-[#ffa800]">
                  Top rated
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-advertiser text-[#0fa628]">
                  Advertiser
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                  Book online
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ffbfc0] text-favorite">
                  Customer favourite
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              <a href="#" className="border-b-2 border-primary px-1 py-4 text-sm font-medium text-foreground">
                Booking
              </a>
              <a href="#" className="px-1 py-4 text-sm font-medium text-muted-foreground">
                About us
              </a>
              <a href="#" className="px-1 py-4 text-sm font-medium text-muted-foreground">
                Staff
              </a>
              <a href="#" className="px-1 py-4 text-sm font-medium text-muted-foreground">
                Certificates
              </a>
              <a href="#" className="px-1 py-4 text-sm font-medium text-muted-foreground">
                Reviews
              </a>
            </nav>
          </div>

          {/* Content */}
          <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Services */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Based on your search</h2>
                <div className="relative mb-6">
                  <div className="flex items-center border border-border rounded-md px-3 py-2 bg-input">
                    <Search className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">Lash lift</span>
                  </div>
                </div>

                {/* Service Cards */}
                <div className="space-y-4">
                  {/* Service 1 */}
                  <div className="border border-border rounded-lg p-4 relative">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Lash lift with color</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">60 min.</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      Når du besøger klinikken, vil du blive budt velkommen af Synnøve Thomsen, indehaver af
                      Dermatologisk Skønhedsklinik. Når du besøger klinikken, vil du blive budt velkommen af Synnøve.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">249,5 kr.</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">499 kr.</span>
                      </div>
                      <button className="text-muted-foreground">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Service 2 */}
                  <div className="border border-border rounded-lg p-4 relative">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Lash lift deluxe</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">60 min.</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      Når du besøger klinikken, vil du blive budt velkommen af Synnøve Thomsen, indehaver af
                      Dermatologisk Skønhedsklinik. Når du besøger klinikken.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">249,5 kr.</span>
                      </div>
                      <button className="text-muted-foreground">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offers Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Offers</h2>
                  <button className="text-muted-foreground">
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </div>

                <div className="border border-border rounded-lg p-4 relative mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Black friday 2025</h3>
                    <button className="text-muted-foreground">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* More Services */}
                <div className="space-y-4">
                  {/* Service 3 */}
                  <div className="border border-border rounded-lg p-4 relative">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Lash lift with color</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">60 min.</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      Når du besøger klinikken, vil du blive budt velkommen af Synnøve Thomsen, indehaver af
                      Dermatologisk Skønhedsklinik. Når du besøger klinikken, vil du blive budt velkommen af Synnøve
                      Thomsen, indehaver af Dermatologisk Skønhedsklinik.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">249,5 kr.</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">499 kr.</span>
                      </div>
                      <button className="text-muted-foreground">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Service 4 */}
                  <div className="border border-border rounded-lg p-4 relative">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Massage og wellness</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">60 min.</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      Når du besøger klinikken, vil du blive budt velkommen af Synnøve Thomsen, indehaver af
                      Dermatologisk Skønhedsklinik. Når du besøger klinikken.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">249,5 kr.</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">499 kr.</span>
                      </div>
                      <button className="text-muted-foreground">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Service Section */}
              <div>
                <h2 className="text-lg font-medium mb-4">Book service</h2>

                <div className="space-y-3">
                  {/* Service Groups */}
                  {[1, 2, 3, 4, 5, 6].map((group) => (
                    <div key={group} className="border border-border rounded-lg p-4 flex justify-between items-center">
                      <h3 className="font-medium">Service group</h3>
                      <button className="text-muted-foreground">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  ))}

                  {/* Service without group 1 */}
                  <div className="border border-border rounded-lg p-4 relative">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Service without a group</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">60 min.</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      Når du besøger klinikken, vil du blive budt velkommen af Synnøve Thomsen, indehaver af
                      Dermatologisk Skønhedsklinik. Når du besøger klinikken, vil du blive budt velkommen af Synnøve
                      Thomsen, indehaver af Dermatologisk Skønhedsklinik.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">249,5 kr.</span>
                      </div>
                      <button className="text-muted-foreground">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Service without group 2 */}
                  <div className="border border-border rounded-lg p-4 relative">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Service without a group</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">60 min.</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      Når du besøger klinikken, vil du blive budt velkommen af Synnøve Thomsen, indehaver af
                      Dermatologisk Skønhedsklinik. Når du besøger klinikken.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">249,5 kr.</span>
                      </div>
                      <button className="text-muted-foreground">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Information */}
            <div className="space-y-8">
              {/* Information Section */}
              <div>
                <h2 className="text-lg font-medium mb-4">Information</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Address:</div>
                    <a href="#" className="text-sm text-muted-foreground hover:underline">
                      Frederiksborgvej 129, 2400, København, NV
                    </a>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Phone:</div>
                    <a href="tel:+4530600837" className="text-sm text-muted-foreground hover:underline">
                      +45 30 60 08 37
                    </a>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Email:</div>
                    <a href="mailto:info@fiind.app" className="text-sm text-muted-foreground hover:underline">
                      info@fiind.app
                    </a>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Website:</div>
                    <a href="https://fiind.app/sskinlinik" className="text-sm text-muted-foreground hover:underline">
                      fiind.app/sskinlinik
                    </a>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <a href="#" className="text-muted-foreground hover:text-[#E1306C]">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-[#1877F2]">
                      <Facebook className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="border-t border-border pt-6">
                <h2 className="text-lg font-medium mb-4">Opening hours</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monday:</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tuesday:</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Wednesday:</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Thursday:</span>
                    <span>Åben efter aftale</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Friday:</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Saturday:</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sunday:</span>
                    <span>Lukket</span>
                  </div>
                </div>
              </div>

              {/* Pictures */}
              <div className="border-t border-border pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Pictures</h2>
                  <a href="#" className="text-sm text-[#5565ff] hover:underline">
                    Show all
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((img) => (
                    <div key={img} className="aspect-square rounded-md overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=100&width=100`}
                        alt={`Gallery image ${img}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary py-6 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-lg font-semibold text-foreground flex items-center">
                <span>fiind.nu</span>
                <span className="text-primary text-xs ml-1">+</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                <p>Fiind ApS (CVR: 44660342)</p>
                <p>Flakholmen 17, 1v, 2450, København SV</p>
                <p>+45 29 88 67 67</p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="text-sm text-muted-foreground mb-2">Hent bookingsystem</div>
              <div className="flex space-x-2">
                <a href="#" className="block">
                  <Image
                    src="/placeholder.svg?height=40&width=120"
                    alt="App Store"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </a>
                <a href="#" className="block">
                  <Image
                    src="/placeholder.svg?height=40&width=120"
                    alt="Google Play"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="text-xs text-center text-muted-foreground mt-6">© Fiind.app 2025</div>
        </div>
      </footer>
    </div>
  )
}

