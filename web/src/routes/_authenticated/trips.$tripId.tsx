import { type SubmitEvent, useEffect, useMemo, useState } from "react"

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

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import { Separator } from "@/components/ui/separator"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Textarea } from "@/components/ui/textarea"

export const Route = createFileRoute("/_authenticated/trips/$tripId")({
  component: Component,
})

function Component() {
  return (
    <main className="grid min-h-svh w-full grid-cols-2 overflow-hidden">
      <section
        aria-labelledby="trip-title"
        className="flex min-w-0 flex-col overflow-hidden"
      >
        <header className="p-8">
          <h1 id="trip-title" className="font-heading text-2xl font-bold">
            London Trip
          </h1>
        </header>

        <Tabs defaultValue="gallery" className="min-h-0 flex-1">
          <TabsList variant="line" className="w-full">
            <TabsTrigger value="schedule">
              <CalendarDays aria-hidden="true" />
              Schedule
            </TabsTrigger>

            <TabsTrigger value="gallery">
              <BookImage aria-hidden="true" />
              Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="schedule"
            className="flex min-h-0 overflow-hidden"
          >
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No events yet</EmptyTitle>
              </EmptyHeader>
            </Empty>
          </TabsContent>

          <TabsContent value="gallery" className="flex min-h-0 overflow-hidden">
            <Gallery />
          </TabsContent>
        </Tabs>
      </section>

      <section aria-label="Trip map">
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

type Note = {
  id: string
  title: string
  description: string
  updatedAt: string
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

function Gallery() {
  const { tripId } = Route.useParams()

  const storageKey = `goto:trip:${tripId}:notes`

  const [notes, setNotes] = useState<Note[]>(() => readNotes(storageKey))
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(notes))
  }, [notes, storageKey])

  const editingNote = useMemo(
    () => notes.find((note) => note.id === editingNoteId),
    [editingNoteId, notes]
  )

  const openNewNote = () => {
    setEditingNoteId(null)
    setEditorOpen(true)
  }

  const openEditNote = (note: Note) => {
    setEditingNoteId(note.id)
    setEditorOpen(true)
  }

  const closeEditor = () => {
    setEditorOpen(false)
    setEditingNoteId(null)
  }

  const saveNote = ({ title, description }: NoteEditorValues) => {
    const updatedAt = new Date().toISOString()

    if (editingNoteId) {
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === editingNoteId
            ? { ...note, title, description, updatedAt }
            : note
        )
      )
    } else {
      setNotes((currentNotes) => [
        { id: crypto.randomUUID(), title, description, updatedAt },
        ...currentNotes,
      ])
    }

    closeEditor()
  }

  const deleteNote = (note: Note) => {
    const noteName = note.title || "this note"

    if (!window.confirm(`Delete ${noteName}? This cannot be undone.`)) return

    setNotes((currentNotes) =>
      currentNotes.filter((item) => item.id !== note.id)
    )
  }

  if (editorOpen) {
    return (
      <NoteEditor
        mode={editingNote ? "edit" : "new"}
        note={editingNote}
        onCancel={closeEditor}
        onSubmit={saveNote}
      />
    )
  }

  if (notes.length === 0) {
    return (
      <Empty>
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
          <Button className="w-full" onClick={openNewNote}>
            <Plus data-icon="inline-start" aria-hidden="true" />
            New note
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <section aria-label="Trip notes" className="flex min-h-0 flex-1 flex-col">
      <div className="grid min-h-0 flex-1 content-start gap-4 overflow-y-auto p-8">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            {...note}
            onEdit={() => openEditNote(note)}
            onDelete={() => deleteNote(note)}
          />
        ))}
      </div>

      <Separator />

      <footer className="p-8">
        <Button className="w-full" onClick={openNewNote}>
          <Plus data-icon="inline-start" aria-hidden="true" />
          New note
        </Button>
      </footer>
    </section>
  )
}

type NoteCardProps = Note & {
  onEdit?: () => void
  onDelete?: () => void
}

function NoteCard({ title, description, onEdit, onDelete }: NoteCardProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{title || "Untitled"}</CardTitle>
        <CardAction className="flex gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Edit ${title || "untitled note"}`}
            onClick={onEdit}
          >
            <Edit3 aria-hidden="true" />
          </Button>

          <Button
            variant="destructive"
            size="icon-sm"
            aria-label={`Delete ${title || "untitled note"}`}
            onClick={onDelete}
          >
            <Trash2 aria-hidden="true" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap">{description}</CardContent>
    </Card>
  )
}

type NoteEditorValues = Pick<Note, "title" | "description">

type NoteEditorProps = {
  mode: "new" | "edit"
  note?: Note
  onCancel: () => void
  onSubmit: (values: NoteEditorValues) => void
}

function NoteEditor({ mode, note, onCancel, onSubmit }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title ?? "")
  const [description, setDescription] = useState(note?.description ?? "")
  const [descriptionError, setDescriptionError] = useState("")

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanDescription = description.trim()

    if (!cleanDescription) {
      setDescriptionError("Add a description before saving your note.")
      return
    }

    const cleanTitle = title.trim()

    onSubmit({ title: cleanTitle, description: cleanDescription })
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex min-h-0 flex-1 p-8"
    >
      <FieldSet className="min-h-0 flex-1">
        <FieldLegend>{mode === "new" ? "New note" : "Edit note"}</FieldLegend>

        <FieldGroup className="min-h-0 flex-1">
          <Field>
            <FieldLabel htmlFor="note-title">Title</FieldLabel>
            <Input
              id="note-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Optional title"
              autoComplete="off"
              maxLength={100}
            />
          </Field>

          <Field data-invalid={Boolean(descriptionError)} className="flex-1">
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
              required
              maxLength={2000}
              aria-invalid={Boolean(descriptionError)}
              aria-describedby={
                descriptionError ? "note-description-error" : undefined
              }
              className="flex-1"
            />

            <FieldError id="note-description-error">
              {descriptionError}
            </FieldError>
          </Field>

          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>

            <Button type="submit" className="flex-1">
              {mode === "new" ? "Create note" : "Save note"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
