import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const teamId = parseInt(params.id, 10);

  try {
    // Fetch team players including full user details (name, image)
    const teamPlayers = await prisma.teamUser.findMany({
      where: { teamId },
      include: {
        user: { // Include user details
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    console.log("Fetched team users: ", teamPlayers); // This should now include full user info
    return NextResponse.json(teamPlayers);
  } catch (error) {
    console.error('Error fetching team players:', error);
    return NextResponse.json({ error: 'Failed to fetch team players' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const teamId = parseInt(params.id, 10);
  const { userId } = await req.json();

  try {
    // Add a new player to the team with status set to 'pending'
    const newPlayer = await prisma.teamUser.create({
      data: {
        teamId,
        userId,
        status: 'pending',  // Set the status as 'pending' initially
      },
    });

    return NextResponse.json(newPlayer, { status: 201 });
  } catch (error) {
    console.error('Error adding player:', error);
    return NextResponse.json({ error: 'Failed to add player' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const teamId = parseInt(params.id, 10);
  const { userId, status } = await req.json();

  try {
    // Update the player's status (either 'pending' or 'confirmed')
    const updatedPlayer = await prisma.teamUser.update({
      where: {
        teamId_userId: { teamId, userId },  // Update based on teamId and userId composite key
      },
      data: {
        status,  // Update the status of the player
      },
    });

    return NextResponse.json(updatedPlayer, { status: 200 });
  } catch (error) {
    console.error('Error updating player status:', error);
    return NextResponse.json({ error: 'Failed to update player status' }, { status: 500 });
  }
}
