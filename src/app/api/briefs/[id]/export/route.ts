import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const brief = await prisma.brief.findUnique({ where: { id } });

  if (!brief) {
    return new Response("Brief not found", { status: 404 });
  }

  const body = [
    "ROBOLOGAI ROBOTICS NEWS BRIEF",
    "================================",
    "",
    `TITLE\n${brief.youtubeTitle}`,
    "",
    `SOURCE\n${brief.sourceCompany} — ${brief.sourceTitle}\n${brief.sourceUrl}`,
    "",
    `60-SECOND NEWS SCRIPT\n${brief.newsScript}`,
    "",
    `VOICEOVER SCRIPT\n${brief.voiceoverScript}`,
    "",
    `YOUTUBE DESCRIPTION\n${brief.youtubeDescription}`,
    "",
    `HASHTAGS\n${brief.hashtags.join(" ")}`,
    "",
    `SOURCE CREDIT\n${brief.sourceCredit}`,
    "",
    `STATUS\n${brief.status}`,
  ].join("\n");

  const filename = brief.youtubeTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename || "robologai-brief"}.txt"`,
    },
  });
}
