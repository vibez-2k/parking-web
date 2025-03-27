"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Home, User, UserCog } from 'lucide-react';
import { SearchForm } from "./search-form";
import { UserSwitcher } from "./version-switcher";
import { useUserStore } from '@/store/userStore';

// Skeleton Component for Sidebar Loading State
const SidebarSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((group) => (
        <SidebarGroup key={group}>
          <SidebarGroupLabel>
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[1, 2, 3].map((item) => (
                <SidebarMenuItem key={item}>
                  <SidebarMenuButton
                    isLoading
                    className="w-full"
                  >
                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Function to check if the current path matches the item's URL
  const isActiveItem = (itemUrl: string) => {
    // Remove language prefix and compare
    const cleanPathname = pathname.replace(/^\/[a-z]{2}/, '')
    const cleanItemUrl = itemUrl.replace(/^\//, '')

    return cleanPathname === cleanItemUrl ||
      cleanPathname.startsWith(cleanItemUrl)
  }

  const { navMain, loading } = useUserStore()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <UserSwitcher />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {loading ? (
          <SidebarSkeleton />
        ) : (
          navMain.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActiveItem(item.url)}
                      >
                        <Link href={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}