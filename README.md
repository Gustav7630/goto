# Goto

Goto is a trip planning agent.
A user describes what they want to do in a location, such as "I like Italian food, parks and art" and Goto generates a trip plan that accounts for their request and preferences.
Trips can be edited as plans change.
In the future, the app will support shared trip planning, notes, media, offline access and exports to other services.

## Repository Layout

```text
server/    # FastAPI application
web/       # React application
AGENTS.md  # Review guidance for AI tools
README.md
```

## Tech Stack

### Server

- Python
- FastAPI
- PostgreSQL hosted by Supabase
- `uv` for Python environments and dependencies

### Web

- Vite
- React with TypeScript
- TanStack Router
- TanStack Query
- Tailwind CSS
- shadcn/ui
- Lucide icons
- `pnpm` for JavaScript dependencies and scripts

## Roadmap

### v0

- Generate a trip from a natural-language prompt
- Let the user choose the trip location
- Allow anonymous trip generation without requiring an account

### v1

- User registration, login and logout
- Saved past and upcoming trips
- Budget ranges for generated trips
- Dietary, accessibility and travel preferences
- Editing a trip schedule after generation
- Protected access to user-owned trip data

### Future

- Present multiple itinerary options
- Optimize routes for travel time
- Collaborative trip editing
- Notes on trips and itinerary events
- Photo and video galleries
- Offline trip access
- Google Maps export
- Google Calendar export

## Local Development

Run the frontend.

```sh
cd web
pnpm install
pnpm dev
```
