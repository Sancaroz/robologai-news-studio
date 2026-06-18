import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { generatedBriefSchema, type GeneratedBrief } from "@/lib/brief-schema";

type BriefInput = {
  sourceTitle: string;
  sourceCompany: string;
  sourceUrl: string;
  transcript: string;
};

function createDemoBrief(input: BriefInput): GeneratedBrief {
  const subject = input.sourceTitle || `${input.sourceCompany} robotics update`;
  const company = input.sourceCompany || "The robotics company";

  return {
    newsScript: `${company} has published a new robotics update: ${subject}. The footage shows a system designed to move robotics from controlled demonstrations toward practical work. The important question is not only what the robot can do in this clip, but how reliably it can repeat the task outside a staged environment. ${company} presents the demonstration as progress, but the public material does not establish independent performance, deployment scale, safety results, or pricing. Those details matter before the technology can be compared with existing automation. For now, this is a useful signal of where the company is focusing its engineering effort, and what robotics teams will need to prove next.`,
    youtubeTitle: `${company}: What This Robot Demo Really Shows`.slice(0, 80),
    youtubeDescription: `A concise robotics news analysis of ${subject}. We break down what the public demonstration shows, what it could mean, and which claims still need evidence.\n\nSource: ${input.sourceUrl}`,
    hashtags: ["#Robotics", "#RobotNews", "#Automation", "#AI"],
    sourceCredit: `Source footage: ${company}; used in short excerpts for news commentary and analysis.`,
    voiceoverScript: `${company} has published a new robotics update. The footage shows a system designed to move robotics from controlled demonstrations toward practical work. The key question is how reliably it can repeat the task outside a staged environment. The public material does not yet establish independent performance, deployment scale, safety results, or pricing. Those details will determine whether this technology can compete with existing automation. For now, the demonstration is a useful signal of where ${company} is focusing, and what it will need to prove next.`,
  };
}

export async function generateBrief(input: BriefInput) {
  if (!process.env.OPENAI_API_KEY) {
    return { brief: createDemoBrief(input), generatedWithAi: false };
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.parse({
    model: process.env.OPENAI_MODEL || "gpt-5.5",
    input: [
      {
        role: "system",
        content:
          "You are an independent English-language robotics news editor. Create original reporting and commentary, not marketing copy. Use only facts supported by the supplied source details. Clearly distinguish company claims from verified facts. The spoken script should fit about 60 seconds (roughly 130-155 words). Do not imitate or reproduce the source transcript. Always include source credit and frame footage as short excerpts for commentary/news analysis.",
      },
      {
        role: "user",
        content: `Source title: ${input.sourceTitle}\nSource company: ${input.sourceCompany}\nSource URL: ${input.sourceUrl}\nTranscript or editor notes:\n${input.transcript}`,
      },
    ],
    text: {
      format: zodTextFormat(generatedBriefSchema, "robotics_news_brief"),
    },
  });

  if (!response.output_parsed) {
    throw new Error("OpenAI did not return a structured brief.");
  }

  return { brief: response.output_parsed, generatedWithAi: true };
}
