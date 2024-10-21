// app/api/create-team/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST request handler for creating a team
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, avatar } = body;

    // Validate input
    if (!name || !avatar) {
      return NextResponse.json({ error: 'Team name and avatar are required' }, { status: 400 });
    }

    // Create a new team in the database
    const newTeam = await prisma.team.create({
      data: {
        teamName: name,
        image: avatar,
      },
    });

    // Return the newly created team as the response
    return NextResponse.json(newTeam, { status: 200 });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}
