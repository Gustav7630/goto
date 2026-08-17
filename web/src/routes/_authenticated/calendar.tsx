import { createFileRoute, useNavigate } from "@tanstack/react-router"
import {
  IlamyCalendar,
  useIlamyCalendarContext,
  type IlamyCalendarProps,
} from "@ilamy/calendar"
import "dayjs/locale/en-gb"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TRIPS: NonNullable<IlamyCalendarProps["events"]> = [
  {
    id: "london",
    title: "London Trip",
    start: "2024-08-24T00:00:00",
    end: "2024-08-28T23:59:59",
    allDay: true,
    backgroundColor: "bg-primary",
    color: "text-primary-foreground",
    data: { tripId: "1" },
  },
  {
    id: "paris",
    title: "Paris Weekend",
    start: "2024-08-24T00:00:00",
    end: "2024-08-25T23:59:59",
    allDay: true,
    backgroundColor: "bg-primary",
    color: "text-primary-foreground",
    data: { tripId: "2" },
  },
  {
    id: "edinburgh",
    title: "Edinburgh",
    start: "2024-08-24T00:00:00",
    end: "2024-08-24T23:59:59",
    allDay: true,
    backgroundColor: "bg-primary",
    color: "text-primary-foreground",
    data: { tripId: "3" },
  },
  {
    id: "coast",
    title: "Coastal Escape",
    start: "2024-08-07T00:00:00",
    end: "2024-08-09T23:59:59",
    allDay: true,
    backgroundColor: "bg-primary",
    color: "text-primary-foreground",
    data: { tripId: "4" },
  },
  {
    id: "copenhagen",
    title: "Copenhagen",
    start: "2024-08-14T00:00:00",
    end: "2024-08-16T23:59:59",
    allDay: true,
    backgroundColor: "bg-primary",
    color: "text-primary-foreground",
    data: { tripId: "5" },
  },
]

const CALENDAR_VIEWS = ["day", "week", "month", "year"] as const

export const Route = createFileRoute("/_authenticated/calendar")({
  component: CalendarPage,
})

function CalendarPage() {
  const navigate = useNavigate()

  return (
    <main className="flex h-svh min-w-0 flex-1 overflow-hidden bg-background p-3 sm:p-4 lg:p-6">
      <div className="min-h-0 w-full overflow-hidden">
        <IlamyCalendar
          events={TRIPS}
          initialView="month"
          initialDate="2024-08-24"
          firstDayOfWeek="monday"
          locale="en-gb"
          timezone="Europe/London"
          timeFormat="24-hour"
          dayMaxEvents={4}
          eventSpacing={4}
          scrollTime="08:00"
          headerComponent={<CalendarToolbar />}
          hideExportButton
          disableCellClick
          disableDragAndDrop
          onEventClick={(event) => {
            const tripId = event.data?.tripId

            if (typeof tripId !== "string") return

            void navigate({
              to: "/trips/$tripId",
              params: { tripId },
            })
          }}
        />
      </div>
    </main>
  )
}

function CalendarToolbar() {
  const {
    currentDate,
    currentRange,
    view,
    setView,
    nextPeriod,
    prevPeriod,
    today,
  } = useIlamyCalendarContext()

  const periodLabel =
    view === "day"
      ? currentDate.format("dddd, D MMMM YYYY")
      : view === "week"
        ? `${currentRange.start.format("D MMM")} – ${currentRange.end.format(
            "D MMM YYYY"
          )}`
        : view === "year"
          ? currentDate.format("YYYY")
          : currentDate.format("MMMM YYYY")

  return (
    <header className="grid shrink-0 gap-3 pb-4 xl:grid-cols-[1fr_auto_1fr] xl:items-center">
      <div className="order-2 flex items-center gap-2 xl:order-1">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="rounded-r-none"
            onClick={prevPeriod}
            aria-label={`Previous ${view}`}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="-ml-px rounded-l-none"
            onClick={nextPeriod}
            aria-label={`Next ${view}`}
          >
            <ChevronRight />
          </Button>
        </div>
        <Button variant="outline" onClick={today}>
          Today
        </Button>
      </div>

      <h1 className="order-1 text-xl font-semibold tracking-tight sm:text-2xl xl:order-2 xl:text-center">
        {periodLabel}
      </h1>

      <div
        className="order-3 flex items-center justify-start overflow-x-auto xl:justify-end"
        role="group"
        aria-label="Calendar view"
      >
        {CALENDAR_VIEWS.map((calendarView, index) => (
          <Button
            key={calendarView}
            variant={view === calendarView ? "default" : "outline"}
            className={cn(
              "capitalize",
              index === 0 && "rounded-r-none",
              index > 0 && "-ml-px rounded-none",
              index === CALENDAR_VIEWS.length - 1 && "rounded-r-4xl"
            )}
            onClick={() => setView(calendarView)}
            aria-pressed={view === calendarView}
          >
            {calendarView}
          </Button>
        ))}
      </div>
    </header>
  )
}
