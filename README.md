# Goto

Goto is a trip planning agent.
A user describes what they want to do in a location, such as "I like Italian food, parks and art" and Goto generates a trip plan that accounts for their request and preferences.
Trips can be edited as plans change.

## Repository Layout

```text
server/    # FastAPI application
web/       # React application
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

## Local Development

Run the frontend.

```sh
cd web
pnpm install
pnpm dev
```
