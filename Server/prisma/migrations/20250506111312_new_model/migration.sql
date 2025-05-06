/*
  Warnings:

  - You are about to drop the column `address` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `contactInformation` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `routeDirection` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `venueCapacity` on the `Event` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccessibilityFeature" DROP CONSTRAINT "AccessibilityFeature_venueId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_venueId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "address",
DROP COLUMN "contactInformation",
DROP COLUMN "name",
DROP COLUMN "routeDirection",
DROP COLUMN "userId",
DROP COLUMN "venueCapacity",
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "venueId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "contactInformation" TEXT,
    "venueCapacity" INTEGER,
    "description" TEXT,
    "photos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "routeDirection" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessibilityFeature" ADD CONSTRAINT "AccessibilityFeature_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
