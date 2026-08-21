import { useState } from "react"
import { Link, createFileRoute } from "@tanstack/react-router"
import { Ellipsis, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"

export const Route = createFileRoute("/_authenticated/trips/")({
  component: SearchTripsPage,
})

const savedTrips = [
  { id: "london", title: "London Trip" },
  { id: "norway", title: "Norway Trip" },
] as const

function SearchTripsPage() {
  const [query, setQuery] = useState("")
  const normalizedQuery = query.trim().toLowerCase()
  const filteredTrips = savedTrips.filter((trip) =>
    trip.title.toLowerCase().includes(normalizedQuery)
  )

  return (
    <main className="flex w-full justify-center p-4 md:p-8">
      <section
        aria-label="Search saved trips"
        className="flex w-full max-w-xl flex-col gap-8"
      >
        <InputGroup>
          <InputGroupInput
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search Trips"
            placeholder="Search Trips"
          />
          <InputGroupAddon align="inline-end">
            <Search aria-hidden="true" />
          </InputGroupAddon>
        </InputGroup>

        {filteredTrips.length === 0 ? (
          <Empty className="p-8">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Search />
              </EmptyMedia>
              <EmptyTitle>No trips found</EmptyTitle>
              <EmptyDescription>
                Try searching for a different trip.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ItemGroup className="gap-0">
            {filteredTrips.map((trip) => (
              <Item key={trip.id}>
                <ItemContent>
                  <ItemTitle>
                    <Link to="/trips/$tripId" params={{ tripId: trip.id }}>
                      {trip.title}
                    </Link>
                  </ItemTitle>
                </ItemContent>
                <ItemActions>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Options for ${trip.title}`}
                  >
                    <Ellipsis />
                  </Button>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        )}
      </section>
    </main>
  )
}
