import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { teamId, userId } = await req.json();

    if (!teamId || !userId) {
      return NextResponse.json({ error: "Team ID and User ID are required" }, { status: 400 });
    }

    // Update player's status to confirmed
    const updatedPlayer = await prisma.teamUser.update({
      where: {
        teamId_userId: {
          teamId: parseInt(teamId),
          userId: userId,
        },
      },
      data: {
        status: "confirmed",
      },
    });

    return NextResponse.json(updatedPlayer, { status: 200 });
  } catch (error) {
    console.error("Error confirming player:", error);
    return NextResponse.json({ error: "Failed to confirm player" }, { status: 500 });
  }
}
