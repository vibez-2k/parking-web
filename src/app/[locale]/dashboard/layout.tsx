"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { AppSidebar } from "../../../components/app-sidebar";
import ActionSearchBar from "@/components/searchbox/animatedSearch";

// Mapping of URL segments to more readable titles
const titleMap: { [key: string]: string } = {
  dashboard: "Dashboard",
  routing: "Routing",
  "data-fetching": "Data Fetching",
  rendering: "Rendering",
  "project-structure": "Project Structure",
  "getting-started": "Getting Started",
  "building-application": "Building Your Application",
  "api-reference": "API Reference",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Function to generate breadcrumb items
  const generateBreadcrumbs = () => {
    // Remove language prefix and split the path
    const pathSegments = pathname
      .replace(/^\/[a-z]{2}\//, "")
      .split("/")
      .filter(Boolean);

    // Generate breadcrumb items
    return pathSegments.map((segment, index) => {
      const title =
        titleMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

      // Last segment is the current page
      if (index === pathSegments.length - 1) {
        return (
          <BreadcrumbItem key={segment}>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        );
      }

      // Previous segments are links
      return (
        <>
          {/* // <React.Fragment key={segment}> */}
          <BreadcrumbItem>
            <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
          </BreadcrumbItem>
          {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
          {/* </React.Fragment> */}
        </>
      );
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex  justify-between h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
            </Breadcrumb>
          </div>
          <ActionSearchBar />
        </header>
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
