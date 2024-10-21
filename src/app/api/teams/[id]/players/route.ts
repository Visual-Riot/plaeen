import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const teamId = parseInt(params.id, 10);

  try {
    const players = await prisma.teamUser.findMany({
      where: { teamId },
      include: { user: true }, // Include user details like name, image
    });

    return NextResponse.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const teamId = parseInt(params.id, 10);
  const { userId } = await req.json();

  try {
    const newPlayer = await prisma.teamUser.create({
      data: {
        teamId,
        userId,
        status: 'pending', // Set initial status to 'pending'
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
  const { userId, status } = await req.json(); // Expect userId and new status from the body

  try {
    const updatedPlayer = await prisma.teamUser.update({
      where: {
        teamId_userId: { teamId, userId }, // Update based on teamId and userId
      },
      data: {
        status,
      },
    });

    return NextResponse.json(updatedPlayer, { status: 200 });
  } catch (error) {
    console.error('Error updating player status:', error);
    return NextResponse.json({ error: 'Failed to update player status' }, { status: 500 });
  }
}
