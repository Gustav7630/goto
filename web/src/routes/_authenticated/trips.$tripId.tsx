import { createFileRoute } from "@tanstack/react-router"

import Map from "react-map-gl/maplibre"
import "maplibre-gl/dist/maplibre-gl.css"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty"

export const Route = createFileRoute("/_authenticated/trips/$tripId")({ component: TripPage })

function TripPage() {
  return (
    <main className="flex w-full">
      <div className="min-w-sm flex-1">
        <h1 className="px-4 py-8 text-xl font-bold">London Trip</h1>
        <Tabs className="h-full">
          <TabsList variant="line" className="w-full">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>
          <TabsContent value="schedule">
            <Empty className="h-full">
              <EmptyHeader>
                <EmptyTitle>No Events Yet</EmptyTitle>
              </EmptyHeader>
            </Empty>
          </TabsContent>
          <TabsContent value="gallery">
            <Empty className="h-full">
              <EmptyHeader>
                <EmptyTitle>No Media Yet</EmptyTitle>
              </EmptyHeader>
            </Empty>
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex-3">
        <Map
          initialViewState={{
            latitude: 51.50814652905202,
            longitude: -0.16455892560976706,
            zoom: 13,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://tiles.openfreemap.org/styles/liberty"
        />
      </div>
    </main>
  )
}
