# RoboLogAI Robotics News Studio

An admin-first studio for turning public robotics videos into original, one-minute English news briefs. The MVP supports YouTube source intake, transcript/editor notes, AI or demo brief generation, saved briefs, editing, manual approval, and TXT export.

## Copyright-oriented workflow

- Source videos are treated as reporting material, not republished assets.
- Generated copy must be original commentary and distinguish company claims from verified facts.
- Source/company credit is mandatory.
- Future video rendering is designed around short excerpts for commentary, news, and analysis.
- Nothing is auto-published. An admin must approve every brief.

This product structure supports an editorial workflow, but it does not provide legal advice or guarantee that a particular use is fair use. Review source licenses and applicable law.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- PostgreSQL and Prisma
- OpenAI Responses API with structured output
- Docker Compose
- FFmpeg included in the app image for the Phase 2 media pipeline

## Local setup

Prerequisites: Node.js 22+, npm, PostgreSQL 17+, and optionally Docker Desktop.

1. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

2. Start PostgreSQL:

   ```bash
   docker compose up -d db
   ```

3. Install dependencies and create the database:

   ```bash
   npm install
   npx prisma migrate dev --name init
   npm run db:seed
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`.

## OpenAI billing boundary

No API call is made when `OPENAI_API_KEY` is empty. The app creates a deterministic demo brief so the complete MVP can be tested without cost.

To enable paid AI generation, explicitly add an API key to `.env`:

```env
OPENAI_API_KEY="your-key"
OPENAI_MODEL="gpt-5.5"
```

Generating a brief after this configuration makes a billable OpenAI API request. Keep the key server-side and never expose it through a `NEXT_PUBLIC_` variable.

## Docker

After creating `.env`, run:

```bash
docker compose up --build
docker compose exec app npm run db:seed
```

The app container applies committed database migrations before starting. It is available at `http://localhost:3000`.

## MVP scope

Implemented:

- YouTube URL, title, company, and transcript/editor-notes input
- YouTube thumbnail derivation
- Transcript extraction placeholder
- 60-second script, title, description, hashtags, credit, and voiceover copy
- Free demo generation when no OpenAI key is configured
- Saved briefs dashboard
- Editing and manual approval
- TXT export
- PostgreSQL/Prisma persistence
- Docker and FFmpeg-ready runtime

Phase 2:

- Uploaded source media
- Automated transcript/audio extraction
- English AI voiceover
- FFmpeg 9:16 rendering with short source clips, subtitles, overlays, and credits
- Preview and media export

The Phase 2 HTTP boundaries already exist as `501 Not Implemented` placeholders:

- `POST /api/media/upload`
- `POST /api/transcripts/extract`
- `POST /api/voiceovers/generate`
- `POST /api/renders/create`
- `POST /api/sources/youtube/inspect` currently performs local URL parsing only

See [`TODO.md`](./TODO.md) for the implementation and compliance backlog.

## Architecture

- `src/app` — routes, pages, server actions, export endpoint
- `src/components` — reusable UI
- `src/lib/generate-brief.ts` — paid OpenAI boundary plus free demo fallback
- `src/lib/youtube.ts` — source URL parsing and thumbnail derivation
- `prisma/schema.prisma` — persistent editorial brief model

## Development restriction

Project generation does not require running the application. Dependency
installation, migrations, builds, and development servers should only be run
later in an authorized environment with Node.js, PostgreSQL, and optionally
Docker available.

OpenAI integration uses the Responses API and schema-constrained output, following the official structured-output guidance:

- https://developers.openai.com/api/docs/guides/structured-outputs
