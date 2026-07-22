# AGENTS.md

## AI Usage Scope

AI tools are used only to review and explain code in this repository.
Do not create, edit, delete, format, commit or generate project files.
Do not provide generated patches or replacement implementations.
Report findings and explain remediation for the developer to implement manually.

Do not run commands unless the user explicitly asks for validation.
When validation is requested, use only commands already defined by the project and do not let formatters or other tools modify files.

## Project Context

Goto is a trip planning agent.
The repository is planned as two applications:

- `server/`: Python and FastAPI API, managed with `uv`
- `web/`: Vite, React and TypeScript client, managed with `pnpm`

PostgreSQL hosted by Supabase is the planned database.
Read `README.md` before reviewing architectural or product decisions.

## Current Status

Do not claim that setup, test, lint or build commands work until the corresponding configuration exists.
Flag documentation that becomes inconsistent with the implemented tooling.

## Repository Boundaries

Review changes against these boundaries:

- Backend code, Python configuration, migrations and backend tests belong in `server/`
- Frontend code, assets, TypeScript configuration and frontend tests belong in `web/`
- Shared product and contributor documentation belongs at the repository root
- Server domain logic should not be duplicated in the web client
- API contract changes should be coordinated across both applications

## Server Review Checklist

- Check that request-scoped dependencies such as database sessions and authenticated users use FastAPI dependency injection
- Check that API boundaries use typed request and response models
- Check that route handlers stay thin and domain behavior remains independently testable
- Identify blocking work in async request paths and unnecessary async code
- Check HTTP status codes and error shapes and identify leaked exceptions or secrets
- Verify ownership checks on every authenticated trip and user operation
- Identify credentials in source control or unsafe environment examples
- Flag Python dependencies managed outside `uv`

## Web Review Checklist

- Check strict TypeScript types, especially at API boundaries
- Check that routing uses TanStack Router and server state uses TanStack Query
- Identify local UI state stored in the query cache or duplicated remote data
- Check consistency with established shadcn/ui, Tailwind and Lucide patterns
- Review controls for keyboard access, visible focus states and appropriate labels
- Flag npm or Yarn usage; frontend dependencies and scripts use `pnpm`

## API Review Checklist

- Check that server API routes use the `/api` prefix, plural resource names and collection paths without trailing slashes
- Check that trip routes remain under `/api/trips`, authentication under `/api/auth` and user operations under `/api/users`
- Verify that anonymous v0 generation through `POST /api/trips` does not weaken authorization for v1 saved-trip operations
- Identify API changes that are not reflected in documentation, server models, client types and related tests

## Development Workflow

Inspect `server/pyproject.toml` and `web/package.json` before suggesting or, when explicitly requested, running commands. 
They are the source of truth once present. 

The expected base commands are:

```sh
cd server
uv sync
uv run fastapi dev
```

```sh
cd web
pnpm install
pnpm dev
```

Only suggest existing scripts for formatting, linting, type checking, testing, builds and migrations. 
Do not invent commands or run tools that modify files.

## Code Review Requirements

- Present findings first, ordered by severity
- Include exact file and line references for each finding
- Explain the impact and a concise remediation without generating replacement code
- Prioritize correctness, security, privacy, authorization, data integrity, behavioral regressions and API compatibility over style preferences
- Identify missing tests for changed behavior, invalid inputs, failure paths and authorization boundaries
- Identify generated output or lock files that appear to have been edited manually
- Identify documentation that is inconsistent with implemented behavior
- State explicitly when no findings are discovered and mention any residual risks or testing gaps
