-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "venueCapacity" INTEGER,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "contactInformation" DROP NOT NULL,
ALTER COLUMN "photos" SET DEFAULT ARRAY[]::TEXT[];
