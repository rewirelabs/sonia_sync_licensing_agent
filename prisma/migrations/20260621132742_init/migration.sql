-- CreateTable
CREATE TABLE "Brief" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rawInput" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TargetArc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "briefId" TEXT NOT NULL,
    "shape" TEXT NOT NULL,
    "peakPositionPct" REAL NOT NULL,
    "vocalGender" TEXT NOT NULL,
    "themesIncluded" TEXT NOT NULL,
    "themesExcluded" TEXT NOT NULL,
    "targetMarkets" TEXT NOT NULL,
    "languages" TEXT NOT NULL,
    "targetDurationSec" REAL NOT NULL,
    "brandProfile" TEXT NOT NULL,
    CONSTRAINT "TargetArc_briefId_fkey" FOREIGN KEY ("briefId") REFERENCES "Brief" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ShortlistItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "briefId" TEXT NOT NULL,
    "isrc" TEXT NOT NULL,
    "spotifyId" TEXT,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "fitScore" REAL NOT NULL,
    "fitRationale" TEXT NOT NULL,
    "recommendedWindowStartMs" INTEGER NOT NULL,
    "recommendedWindowEndMs" INTEGER NOT NULL,
    "moneyLineTimestampMs" INTEGER NOT NULL,
    "safetyVerdict" TEXT NOT NULL,
    "safeSectionStartMs" INTEGER,
    "safeSectionEndMs" INTEGER,
    "coverUrl" TEXT,
    "previewUrl" TEXT,
    CONSTRAINT "ShortlistItem_briefId_fkey" FOREIGN KEY ("briefId") REFERENCES "Brief" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isrc" TEXT NOT NULL,
    "instrumentalUrl" TEXT NOT NULL,
    "acapellaUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Stems_isrc_key" ON "Stems"("isrc");
