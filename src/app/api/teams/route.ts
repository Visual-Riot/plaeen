import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET requests to fetch teams
export async function GET() {
  try {
    // Fetch all teams (You can add filtering based on the user if needed)
    const teams = await prisma.team.findMany();

    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}
