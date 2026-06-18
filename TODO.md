# RoboLogAI implementation TODO

## MVP hardening

- [ ] Install project dependencies in an authorized development environment.
- [ ] Run TypeScript, ESLint, Prisma validation, and production build checks.
- [ ] Apply the initial PostgreSQL migration and verify seed data.
- [ ] Add friendly form validation errors instead of surfacing server exceptions.
- [ ] Add loading, empty, failure, and retry states to brief generation.
- [ ] Add authentication and restrict every admin route.
- [ ] Add CSRF/rate-limit protections where appropriate.
- [ ] Add tests for YouTube URL parsing, demo generation, brief updates, and TXT export.
- [ ] Add pagination and search to the saved briefs dashboard.
- [ ] Add deletion and archival with explicit confirmation.

## Source ingestion

- [ ] Fetch permitted public metadata through an approved provider or official API.
- [ ] Add MP4, MOV, and WebM upload handling.
- [ ] Store uploaded media in private object storage, never under `/public`.
- [ ] Validate media MIME type, extension, duration, dimensions, and size.
- [ ] Add source license, publication date, and original creator fields.
- [ ] Record source-access and attribution metadata for editorial auditing.

## Transcript pipeline

- [ ] Create a background job model and worker boundary.
- [ ] Extract source audio with FFmpeg in an isolated worker.
- [ ] Add timestamped transcription behind an explicit paid-provider setting.
- [ ] Let the admin correct transcript segments before generation.
- [ ] Store transcript provenance and extraction status.

## Editorial generation

- [ ] Add an admin-controlled OpenAI configuration screen.
- [ ] Display a cost warning before any paid API request.
- [ ] Add claim extraction and a fact-check checklist.
- [ ] Highlight unsupported claims and promotional language.
- [ ] Enforce target voiceover length with word-count validation.
- [ ] Add regenerate-one-field controls without replacing approved copy.
- [ ] Store prompt version, model identifier, and generation timestamp.

## Voiceover and rendering

- [ ] Add English voice selection and preview.
- [ ] Require confirmation before paid speech generation.
- [ ] Design a clip-selection timeline with source timecodes.
- [ ] Limit source excerpts and require an editorial purpose for each clip.
- [ ] Generate 1080x1920 video with FFmpeg.
- [ ] Add title overlays, subtitles, safe-area guides, and persistent source credit.
- [ ] Normalize narration and source audio levels.
- [ ] Produce a low-resolution preview before final export.
- [ ] Store render logs and exact source timecodes.

## Approval and publishing

- [ ] Add separate editorial and final-render approval states.
- [ ] Prevent export of unapproved final media.
- [ ] Add an immutable approval audit log.
- [ ] Keep publishing integrations disabled by default.
- [ ] If publishing is later added, require a final explicit admin confirmation.

## Copyright and compliance

- [ ] Add a source-rights checklist before rendering.
- [ ] Require visible company/source attribution.
- [ ] Block full-length or near-continuous source reuse.
- [ ] Require original narration and commentary in every render.
- [ ] Add configurable clip-duration and cumulative-use warnings.
- [ ] Document takedown, correction, and source-removal procedures.
- [ ] Obtain legal review before production use.
