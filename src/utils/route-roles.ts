export const navlinks = {
  "Super Admin": [
    {
      title: "Stats & availability",
      url: "#",
      items: [
        { title: "Dashboard", url: "/dashboard" },
        { title: "Parking venues cards", url: "/dashboard/parking-venues-cards" },
        { title: "Parking venues map", url: "/dashboard/parking-venues-map" },
      ],
    },
    {
      title: "Live feeds",
      url: "#",
      items: [
        { title: "video live feeds", url: "/dashboard/Livevideos" },
        { title: "Live Count", url: "/dashboard/live-count" },
      ],
    },
    {
      title: "Tickets",
      url: "#",
      items: [
        { title: "Fined vehicles", url: "/dashboard/fined-vehicles" },
      ],
    },
    {
      title: "Verification",
      url: "#",
      items: [
        { title: "Venue verification", url: "/dashboard/venue-verification" },
        { title: "User verification", url: "/dashboard/User-verification" },
      ],
    },
  ],
  User: [
    {
      title: "stats & details",
      url: "#",
      items: [
        { title: "Dashboard", url: "/dashboard" },
        { title: "Book a parking spot", url: "/dashboard/book-parking-spot" },
      ],
    },
    {
      title: "Route Navigation",
      url: "#",
      items: [
        { title: "navigation", url: "/dashboard/navigation" },
      ],
    },
    {
      title: "History",
      url: "#",
      items: [
        { title: "Booking history", url: "/dashboard/booking-history" },
        { title: "Payment history", url: "/dashboard/payment-history" },
      ],
    },
  ],
  "Venue Owner": [
    {
      title: "Stats & status",
      url: "#",
      items: [
        { title: "Dashboard", url: "/dashboard" },
        { title: "venue status cards", url: "/dashboard/parking-venues-cards" },
        { title: "venue status map", url: "/dashboard/parking-venues-map" },
      ],
    },
    {
      title: "Live feeds",
      url: "#",
      items: [
        { title: "video live feeds", url: "/dashboard/live-feed" },
        { title: "Live Count", url: "/dashboard/live-count" },
      ],
    },
    {
      title: "Add venue",
      url: "#",
      items: [
        { title: "Upload new venue", url: "/dashboard/upload-venue" },
      ],
    },
  ],
};

// Dynamically generate protectedRoutes from navlinks
export const protectedRoutes: Record<string, string[]> = {};

Object.entries(navlinks).forEach(([role, sections]) => {
  sections.forEach(section => {
    section.items.forEach(item => {
      const path = item.url;
      if (!protectedRoutes[path]) {
        protectedRoutes[path] = [];
      }
      protectedRoutes[path].push(role);
    });
  });
});

// Add additional protected routes that don't appear in the navigation
export const additionalProtectedRoutes: Record<string, string[]> = {
  "/dashboard/live-feed": ["Super Admin", "Venue Owner"],
  "/dashboard/live-count": ["Super Admin", "Venue Owner"],
};

// Merge the additional routes into the main protectedRoutes
Object.entries(additionalProtectedRoutes).forEach(([path, roles]) => {
  if (!protectedRoutes[path]) {
    protectedRoutes[path] = [];
  }
  
  roles.forEach(role => {
    if (!protectedRoutes[path].includes(role)) {
      protectedRoutes[path].push(role);
    }
  });
});