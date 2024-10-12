/*
  Warnings:

  - You are about to drop the `FavoritedGame` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavoritedGame" DROP CONSTRAINT "FavoritedGame_userId_fkey";

-- DropTable
DROP TABLE "FavoritedGame";

-- CreateTable
CREATE TABLE "favouritedGame" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "gameName" TEXT NOT NULL,
    "backgroundImage" TEXT,
    "genres" TEXT[],
    "platforms" TEXT[],
    "rating" DOUBLE PRECISION,
    "favouritedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favouritedGame_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favouritedGame" ADD CONSTRAINT "favouritedGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
