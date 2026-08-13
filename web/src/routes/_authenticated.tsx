import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { supabase } from "@/lib/supabase"

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getClaims()

    if (!data) {
      throw redirect({ to: "/sign-in" })
    }
  },
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
