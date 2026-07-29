import { createFileRoute, Outlet } from "@tanstack/react-router"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"

export const Route = createFileRoute("/_authenticated")({
  component: Component,
})

function Component() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  )
}
