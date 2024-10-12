-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "backgroundImage" TEXT,
ADD COLUMN     "genres" TEXT[],
ADD COLUMN     "platforms" TEXT[],
ADD COLUMN     "rating" DOUBLE PRECISION;
