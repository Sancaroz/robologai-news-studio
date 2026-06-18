"use server";

import { BriefStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { generateBrief } from "@/lib/generate-brief";
import { prisma } from "@/lib/prisma";
import { getYouTubeThumbnail, getYouTubeVideoId } from "@/lib/youtube";

const createBriefSchema = z.object({
  sourceUrl: z.string().url(),
  sourceTitle: z.string().min(3).max(200),
  sourceCompany: z.string().min(2).max(120),
  transcript: z.string().min(40).max(30000),
});

export async function createBriefAction(formData: FormData) {
  const input = createBriefSchema.parse({
    sourceUrl: formData.get("sourceUrl"),
    sourceTitle: formData.get("sourceTitle"),
    sourceCompany: formData.get("sourceCompany"),
    transcript: formData.get("transcript"),
  });

  const generated = await generateBrief(input);
  const videoId = getYouTubeVideoId(input.sourceUrl);
  const brief = await prisma.brief.create({
    data: {
      ...input,
      sourceVideoId: videoId,
      thumbnailUrl: getYouTubeThumbnail(videoId),
      ...generated.brief,
      generatedWithAi: generated.generatedWithAi,
      status: BriefStatus.READY,
    },
  });

  redirect(`/briefs/${brief.id}`);
}

const updateBriefSchema = z.object({
  id: z.string().min(1),
  newsScript: z.string().min(20),
  youtubeTitle: z.string().min(3).max(100),
  youtubeDescription: z.string().min(10),
  hashtags: z.string(),
  sourceCredit: z.string().min(5),
  voiceoverScript: z.string().min(20),
});

export async function updateBriefAction(formData: FormData) {
  const input = updateBriefSchema.parse({
    id: formData.get("id"),
    newsScript: formData.get("newsScript"),
    youtubeTitle: formData.get("youtubeTitle"),
    youtubeDescription: formData.get("youtubeDescription"),
    hashtags: formData.get("hashtags"),
    sourceCredit: formData.get("sourceCredit"),
    voiceoverScript: formData.get("voiceoverScript"),
  });

  await prisma.brief.update({
    where: { id: input.id },
    data: {
      newsScript: input.newsScript,
      youtubeTitle: input.youtubeTitle,
      youtubeDescription: input.youtubeDescription,
      hashtags: input.hashtags
        .split(/[\s,]+/)
        .map((tag) => tag.trim())
        .filter(Boolean)
        .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`)),
      sourceCredit: input.sourceCredit,
      voiceoverScript: input.voiceoverScript,
    },
  });

  revalidatePath(`/briefs/${input.id}`);
  revalidatePath("/");
}

export async function approveBriefAction(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));
  await prisma.brief.update({
    where: { id },
    data: { status: BriefStatus.APPROVED },
  });
  revalidatePath(`/briefs/${id}`);
  revalidatePath("/");
}
