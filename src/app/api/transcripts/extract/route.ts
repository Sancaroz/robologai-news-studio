import { notImplemented } from "@/lib/api-placeholder";

/**
 * Phase 2 transcript extraction endpoint.
 *
 * Planned behavior:
 * - Accept an uploaded media ID or an approved remote source reference.
 * - Extract audio through the isolated FFmpeg worker.
 * - Send audio to a configured transcription provider only after the admin
 *   explicitly enables the paid integration.
 * - Store timestamped transcript segments for subtitle generation.
 */
export async function POST() {
  return notImplemented("Transcript extraction");
}
