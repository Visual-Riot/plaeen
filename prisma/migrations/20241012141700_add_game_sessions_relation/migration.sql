-- CreateTable
CREATE TABLE "GameSession" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "gameName" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
