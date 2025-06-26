/*
  Warnings:

  - You are about to drop the column `venueId` on the `AccessibilityFeature` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category]` on the table `AccessibilityFeature` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AccessibilityFeature" DROP CONSTRAINT "AccessibilityFeature_venueId_fkey";

-- AlterTable
ALTER TABLE "AccessibilityFeature" DROP COLUMN "venueId";

-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "_VenueFeatures" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_VenueFeatures_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_VenueFeatures_B_index" ON "_VenueFeatures"("B");

-- CreateIndex
CREATE UNIQUE INDEX "AccessibilityFeature_category_key" ON "AccessibilityFeature"("category");

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VenueFeatures" ADD CONSTRAINT "_VenueFeatures_A_fkey" FOREIGN KEY ("A") REFERENCES "AccessibilityFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VenueFeatures" ADD CONSTRAINT "_VenueFeatures_B_fkey" FOREIGN KEY ("B") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
