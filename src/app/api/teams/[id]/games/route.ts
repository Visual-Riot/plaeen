import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const gameSessions = await prisma.gameSession.findMany({
      where: {
        teamId: parseInt(id),
      },
    });

    return NextResponse.json(gameSessions, { status: 200 });
  } catch (error) {
    console.error('Error fetching game sessions:', error);
    return NextResponse.json({ error: 'Failed to fetch game sessions' }, { status: 500 });
  }
}