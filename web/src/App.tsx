import { Plus, Navigation, MapPinPen } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Textarea } from "@/components/ui/textarea"

export function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full items-center justify-center">
        <Card className="w-md">
          <CardHeader>
            <CardTitle className="flex gap-2">
              London <MapPinPen size={20} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter what you want to do here..."
              className="rounded-none border-none bg-transparent p-0 shadow-none outline-none focus-visible:border-none focus-visible:ring-0"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="border-width-2 bg-transparent hover:bg-gray-100">
              <Plus color="black" />
            </Button>
            <Button>
              <Navigation />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </SidebarProvider>
  )
}

export default App
