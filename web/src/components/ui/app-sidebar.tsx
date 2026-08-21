import { Link } from "@tanstack/react-router"

import { CirclePlus, Route, Calendar } from "lucide-react"

import { AccountControlsDialogContent } from "@/components/account-controls-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link to="/" />}>
                <CirclePlus />
                New Trip
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link to="/trips" />}>
                <Route />
                <span>Search Trips</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link to="/calendar" />}>
                <Calendar />
                <span>Calendar</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Dialog>
              <DialogTrigger
                render={
                  <SidebarMenuButton type="button">
                    <Avatar>
                      <AvatarFallback>LM</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Open account controls</span>
                  </SidebarMenuButton>
                }
              />
              <AccountControlsDialogContent />
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
