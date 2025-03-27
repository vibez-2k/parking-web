"use client"

import { Check, ChevronsUpDown, User, UserCog, Home } from "lucide-react"
import * as React from "react"
import { useUserStore } from "@/store/userStore" // Update with correct import path

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Mapping of icon strings to Lucide icons
const iconMap = {
  "User": User,
  "UserCog": UserCog,
  "Home": Home
}

export function UserSwitcher() {
  // Use the userStore to access roles and fetch nav links
  const { userRoles, currentRole, fetchNavLinks, setCurrentRole,navMain } = useUserStore()
  
  // Fetch nav links when component mounts
  React.useEffect(() => {
    fetchNavLinks()
  }, [fetchNavLinks])

  // Handle role selection
  const handleRoleChange = (role) => {
    setCurrentRole(role)
    fetchNavLinks() // Refetch nav links based on the new role
  }

  // Get the icon component based on the icon string
  const RoleIcon = iconMap[currentRole.icon] || User

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-sidebar-primary-foreground">
                <RoleIcon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Change Role</span>
                <span className="">{currentRole.role}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {userRoles.map((role) => {
              const RoleItemIcon = iconMap[role.icon] || User
              return (
                <DropdownMenuItem
                  key={role.role}
                  onSelect={() => handleRoleChange(role)}
                >
                  <RoleItemIcon className="mr-2 size-4" />
                  {role.role}
                  {role.role === currentRole.role && <Check className="ml-auto" />}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}