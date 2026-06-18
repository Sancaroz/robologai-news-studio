-- CreateEnum
CREATE TYPE "BriefStatus" AS ENUM ('DRAFT', 'READY', 'APPROVED');

-- CreateTable
CREATE TABLE "Brief" (
    "id" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "sourceVideoId" TEXT,
    "sourceTitle" TEXT NOT NULL,
    "sourceCompany" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "transcript" TEXT NOT NULL,
    "newsScript" TEXT NOT NULL,
    "youtubeTitle" TEXT NOT NULL,
    "youtubeDescription" TEXT NOT NULL,
    "hashtags" TEXT[],
    "sourceCredit" TEXT NOT NULL,
    "voiceoverScript" TEXT NOT NULL,
    "status" "BriefStatus" NOT NULL DEFAULT 'DRAFT',
    "generatedWithAi" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brief_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Brief_createdAt_idx" ON "Brief"("createdAt");

-- CreateIndex
CREATE INDEX "Brief_status_idx" ON "Brief"("status");
