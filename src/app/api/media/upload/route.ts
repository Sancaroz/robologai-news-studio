import { notImplemented } from "@/lib/api-placeholder";

/**
 * Phase 2 media ingestion endpoint.
 *
 * Planned behavior:
 * - Accept MP4, MOV, or WebM uploads.
 * - Validate MIME type, extension, and configured file-size limits.
 * - Store media outside the public directory.
 * - Create a SourceMedia record and enqueue metadata extraction.
 */
export async function POST() {
  return notImplemented("Source video upload");
}
