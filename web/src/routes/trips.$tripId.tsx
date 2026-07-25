import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/trips/$tripId")({ component: TripPage })

function TripPage() {
  return <p>Hello World</p>
}
