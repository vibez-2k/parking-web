import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const navlinks = {
      "Super Admin": [
        {
          title: "Stats & availability",
          url: "#",
          items: [
            {
              title: "Dashboard",
              url: "/dashboard",
            },
            {
              title: "Parking venues cards",
              url: "/dashboard/parking-venues-cards",
            },
            {
              title: "Parking venues map",
              url: "/dashboard/parking-venues-map",
            },
          ],
        },
        {
          title: "Live feeds",
          url: "#",
          items: [
            {
              title: "video live feeds",
              url: "/dashboard/Livevideos",
            },
          ],
        },
        {
          title: "Tickets",
          url: "#",
          items: [
            {
              title: "Fined vehicles",
              url: "/dashboard/fined-vehicles",
            },
          ],
        },
        {
          title: "Verification",
          url: "#",
          items: [
            {
              title: "Venue verification",
              url: "/dashboard/venue-verification",
            },
            {
              title: "User verification",
              url: "/dashboard/User-verification",
            },
          ],
        },
      ],
      User: [
        {
          title: "stats & details",
          url: "#",
          items: [
            {
              title: "Dashboard",
              url: "/dashboard",
            },
            {
              title: "Book a parking spot",
              url: "/dashboard/book-parking-spot",
            },
          ],
        },
        {
          title: "Route Navigation",
          url: "#",
          items: [
            {
              title: "navigation",
              url: "/dashboard/navigation",
              
            }
          ],
        },
        {
          title: "History",
          url: "#",
          items: [
            {
              title: "Booking history",
              url: "/dashboard/booking-history",
            },
            {
              title: "Payment history",
              url: "/dashboard/payment-history",
            },
          ],
        },
      ],
      "Venue Owner": [
        {
          title: "Stats & status",
          url: "#",
          items: [
            {
              title: "Dashboard",
              url: "/dashboard",
            },
            {
              title: "venue status cards",
              url: "/dashboard/parking-venues-cards",
            },
            {
              title: "venue status map",
              url: "/dashboard/parking-venues-map",
            }
          ],
        },
        {
          title: "Live feeds",
          url: "#",
          items: [
            {
              title: "video live feeds",
              url: "/dashboard/live-feed",
            },
          ],
        },
        {
          title: "Add venue",
          url: "#",
          items: [
            {
              title: "Upload new venue",
              url: "/dashboard/upload-venue",
            },
          ],
        },
      ],
    };

    const { role } = await request.json();
    const navMain = navlinks[role];
    return NextResponse.json(
      navMain,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting cart:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
