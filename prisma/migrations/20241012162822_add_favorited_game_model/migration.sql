-- CreateTable
CREATE TABLE "FavoritedGame" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "gameName" TEXT NOT NULL,
    "backgroundImage" TEXT,
    "genres" TEXT[],
    "platforms" TEXT[],
    "rating" DOUBLE PRECISION,
    "favoritedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoritedGame_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavoritedGame" ADD CONSTRAINT "FavoritedGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
