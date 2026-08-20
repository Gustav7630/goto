import { type FormEvent, useEffect, useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import {
  BookImage,
  CalendarDays,
  Edit3,
  Plus,
  StickyNote,
  Trash2,
} from "lucide-react"
import Map from "react-map-gl/maplibre"
import "maplibre-gl/dist/maplibre-gl.css"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

type Note = {
  id: string
  title: string
  description: string
  updatedAt: string
}

function createNoteId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function readNotes(storageKey: string): Note[] {
  try {
    const storedNotes = window.localStorage.getItem(storageKey)
    if (!storedNotes) return []

    const parsedNotes: unknown = JSON.parse(storedNotes)
    if (!Array.isArray(parsedNotes)) return []

    return parsedNotes.filter(
      (note): note is Note =>
        typeof note === "object" &&
        note !== null &&
        typeof note.id === "string" &&
        typeof note.title === "string" &&
        typeof note.description === "string" &&
        typeof note.updatedAt === "string"
    )
  } catch {
    return []
  }
}

export const Route = createFileRoute("/_authenticated/trips/$tripId")({
  component: TripPage,
})

function TripPage() {
  const { tripId } = Route.useParams()
  const storageKey = `goto:trip:${tripId}:notes`
  const [notes, setNotes] = useState<Note[]>(() => readNotes(storageKey))
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [descriptionError, setDescriptionError] = useState("")

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(notes))
  }, [notes, storageKey])

  const editingNote = useMemo(
    () => notes.find((note) => note.id === editingNoteId),
    [editingNoteId, notes]
  )

  const resetEditor = () => {
    setEditingNoteId(null)
    setTitle("")
    setDescription("")
    setDescriptionError("")
  }

  const openNewNote = () => {
    resetEditor()
    setEditorOpen(true)
  }

  const openEditNote = (note: Note) => {
    setEditingNoteId(note.id)
    setTitle(note.title)
    setDescription(note.description)
    setDescriptionError("")
    setEditorOpen(true)
  }

  const closeEditor = () => {
    setEditorOpen(false)
    resetEditor()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanDescription = description.trim()
    if (!cleanDescription) {
      setDescriptionError("Add a description before saving your note.")
      return
    }

    const cleanTitle = title.trim()
    const updatedAt = new Date().toISOString()

    if (editingNoteId) {
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === editingNoteId
            ? {
                ...note,
                title: cleanTitle,
                description: cleanDescription,
                updatedAt,
              }
            : note
        )
      )
    } else {
      setNotes((currentNotes) => [
        {
          id: createNoteId(),
          title: cleanTitle,
          description: cleanDescription,
          updatedAt,
        },
        ...currentNotes,
      ])
    }

    setEditorOpen(false)
    resetEditor()
  }

  const deleteNote = (note: Note) => {
    const noteName = note.title || "this note"
    if (!window.confirm(`Delete ${noteName}? This cannot be undone.`)) return

    setNotes((currentNotes) =>
      currentNotes.filter((item) => item.id !== note.id)
    )
  }

  return (
    <main className="flex min-h-svh w-full overflow-hidden bg-background">
      <section className="flex min-w-0 flex-1 flex-col border-r md:w-[28.25rem] md:flex-none">
        <header className="px-6 py-7 md:px-8">
          <h1 className="font-heading text-2xl font-bold">London Trip</h1>
        </header>

        <Tabs defaultValue="gallery" className="min-h-0 flex-1 gap-0">
          <TabsList variant="line" className="h-14 w-full gap-0 px-0">
            <TabsTrigger
              value="schedule"
              className="h-full rounded-none text-base [&_svg]:size-6"
            >
              <CalendarDays aria-hidden="true" />
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="h-full rounded-none text-base [&_svg]:size-6"
            >
              <BookImage aria-hidden="true" />
              Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="min-h-0">
            <Empty className="h-full rounded-none">
              <EmptyHeader>
                <EmptyTitle>No events yet</EmptyTitle>
              </EmptyHeader>
            </Empty>
          </TabsContent>

          <TabsContent value="gallery" className="min-h-0 overflow-y-auto">
            {editorOpen ? (
              <form
                className="flex min-h-full flex-col"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="border-b px-6 py-6 md:px-8">
                  <h2 className="text-xl font-bold">
                    {editingNote ? "Edit note" : "New note"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {editingNote
                      ? "Update the details for this trip note."
                      : "Add something you want to remember for this trip."}
                  </p>
                </div>

                <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
                  <Field>
                    <FieldLabel htmlFor="note-title">Title</FieldLabel>
                    <Input
                      id="note-title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="Optional title"
                      autoComplete="off"
                      maxLength={100}
                      className="h-11 rounded-2xl"
                    />
                  </Field>

                  <Field data-invalid={Boolean(descriptionError)}>
                    <FieldLabel htmlFor="note-description">
                      Description <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Textarea
                      id="note-description"
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value)
                        if (event.target.value.trim()) setDescriptionError("")
                      }}
                      placeholder="What do you want to remember?"
                      rows={8}
                      required
                      maxLength={2000}
                      aria-invalid={Boolean(descriptionError)}
                      aria-describedby={
                        descriptionError ? "note-description-error" : undefined
                      }
                      className="min-h-48"
                    />
                    <FieldError id="note-description-error">
                      {descriptionError}
                    </FieldError>
                  </Field>
                </div>

                <div className="sticky bottom-0 mt-auto flex flex-col-reverse gap-2 border-t bg-background/95 p-6 backdrop-blur sm:flex-row sm:justify-end md:px-8">
                  <Button type="button" variant="outline" onClick={closeEditor}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingNote ? "Save changes" : "Create note"}
                  </Button>
                </div>
              </form>
            ) : notes.length === 0 ? (
              <Empty className="h-full min-h-96 rounded-none px-8">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <StickyNote aria-hidden="true" />
                  </EmptyMedia>
                  <EmptyTitle>No notes yet</EmptyTitle>
                  <EmptyDescription>
                    Save ideas, places, and reminders for your trip.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button
                    className="h-14 w-full text-base font-bold [&_svg]:size-6"
                    onClick={openNewNote}
                  >
                    <Plus data-icon="inline-start" aria-hidden="true" />
                    New note
                  </Button>
                </EmptyContent>
              </Empty>
            ) : (
              <div className="flex min-h-full flex-col">
                <div className="grid gap-4 p-6 md:p-8">
                  {notes.map(({ id, title, description, updatedAt }) => (
                    <NoteCard
                      id={id}
                      title={title}
                      description={description}
                      updatedAt={updatedAt}
                    />
                  ))}
                </div>

                <div className="sticky bottom-0 mt-auto border-t bg-background/95 p-6 backdrop-blur md:px-8">
                  <Button
                    className="h-14 w-full text-base font-bold [&_svg]:size-6"
                    onClick={openNewNote}
                  >
                    <Plus data-icon="inline-start" aria-hidden="true" />
                    New note
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      <section
        className="relative hidden min-w-0 flex-1 md:block"
        aria-label="Trip map"
      >
        <Map
          initialViewState={{
            latitude: 51.50814652905202,
            longitude: -0.16455892560976706,
            zoom: 13,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://tiles.openfreemap.org/styles/liberty"
        />
      </section>
    </main>
  )
}

type NoteCardProps = Note & {
  onEdit?: () => void
  onDelete?: () => void
}

function NoteCard({ id, title, description, onEdit, onDelete }: NoteCardProps) {
  return (
    <Card key={id} className="gap-2">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="flex-1 font-bold">
          {title || "Untitled"}
        </CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Edit ${title || "untitled note"}`}
            onClick={onEdit}
          >
            <Edit3 aria-hidden="true" />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="text-destructive hover:text-destructive"
            aria-label={`Delete ${title || "untitled note"}`}
            onClick={onDelete}
          >
            <Trash2 aria-hidden="true" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  )
}
