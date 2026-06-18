import { NextResponse } from "next/server";
import { z } from "zod";
import { getYouTubeThumbnail, getYouTubeVideoId } from "@/lib/youtube";

const requestSchema = z.object({
  url: z.string().url(),
});

/**
 * Safe MVP helper: derives a video ID and thumbnail URL locally.
 * It does not download video content, scrape YouTube, or call a paid API.
 */
export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, code: "INVALID_URL", message: "A valid YouTube URL is required." },
      { status: 400 },
    );
  }

  const videoId = getYouTubeVideoId(parsed.data.url);

  if (!videoId) {
    return NextResponse.json(
      { ok: false, code: "UNSUPPORTED_URL", message: "The URL is not a supported YouTube video URL." },
      { status: 422 },
    );
  }

  return NextResponse.json({
    ok: true,
    videoId,
    thumbnailUrl: getYouTubeThumbnail(videoId),
    title: null,
    sourceCompany: null,
    transcript: null,
    note: "Metadata and transcript retrieval are Phase 2 integrations.",
  });
}
