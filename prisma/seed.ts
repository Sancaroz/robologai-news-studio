import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.brief.upsert({
    where: { id: "demo-brief" },
    update: {},
    create: {
      id: "demo-brief",
      sourceUrl: "https://www.youtube.com/watch?v=demo",
      sourceTitle: "Humanoid robot learns a new warehouse task",
      sourceCompany: "Example Robotics",
      transcript:
        "A humanoid robot demonstrates a warehouse picking workflow. The company says the system can learn new tasks from operator demonstrations.",
      newsScript:
        "A humanoid robot is taking on a new warehouse job. Example Robotics has demonstrated a system that learns a picking workflow from an operator, then repeats the task autonomously. The key detail is not just the movement—it is the training method. Faster task setup could make general-purpose robots more practical in facilities where workflows change frequently. The company has not yet shared independent performance data, deployment scale, or pricing. Those details will determine whether this moves from a controlled demonstration to everyday warehouse work. For now, the video offers a useful look at how robot training may become less dependent on hand-written programming.",
      youtubeTitle: "This Humanoid Just Learned a Warehouse Job",
      youtubeDescription:
        "A quick analysis of Example Robotics’ latest warehouse demonstration, what the training method could change, and what remains unproven.",
      hashtags: ["#Robotics", "#HumanoidRobot", "#Automation", "#RobotNews"],
      sourceCredit: "Source footage: Example Robotics",
      voiceoverScript:
        "A humanoid robot is taking on a new warehouse job. Example Robotics has demonstrated a system that learns a picking workflow from an operator, then repeats the task autonomously.",
      status: "READY",
      generatedWithAi: false,
    },
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
