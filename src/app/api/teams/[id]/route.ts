// app/api/teams/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT: Update a team
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { teamName, image } = body;

    // Validate input
    if (!teamName || !image) {
      return NextResponse.json({ error: 'Team name and avatar are required' }, { status: 400 });
    }

    // Update the team in the database
    const updatedTeam = await prisma.team.update({
      where: { id: Number(params.id) },
      data: { teamName, image },
    });

    return NextResponse.json(updatedTeam, { status: 200 });
  } catch (error) {
    console.error('Error updating team:', error);
    return NextResponse.json({ error: 'Failed to update team' }, { status: 500 });
  }
}

// DELETE: Remove a team
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // Delete the team from the database
    const deletedTeam = await prisma.team.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(deletedTeam, { status: 200 });
  } catch (error) {
    console.error('Error deleting team:', error);
    return NextResponse.json({ error: 'Failed to delete team' }, { status: 500 });
  }
}
