import { Plus, Navigation, MapPinPen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card" 
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Textarea } from "@/components/ui/textarea"

export function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full justify-center items-center">
        <Card className="w-md">
          <CardHeader>
            <CardTitle className="flex gap-2">London <MapPinPen size={20} /></CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Enter what you want to do here..." className="outline-none border-none shadow-none bg-transparent focus-visible:border-none focus-visible:ring-0 p-0 rounded-none" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="bg-transparent border-width-2 hover:bg-gray-100">
              <Plus color="black"/>
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
