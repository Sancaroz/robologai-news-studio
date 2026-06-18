import { z } from "zod";

export const generatedBriefSchema = z.object({
  newsScript: z.string().min(200),
  youtubeTitle: z.string().min(5).max(80),
  youtubeDescription: z.string().min(20).max(1000),
  hashtags: z.array(z.string()).min(3).max(8),
  sourceCredit: z.string().min(5).max(180),
  voiceoverScript: z.string().min(100),
});

export type GeneratedBrief = z.infer<typeof generatedBriefSchema>;
