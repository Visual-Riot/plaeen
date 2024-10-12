// app/api/teams/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// RETRIEVE: Team Name
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const team = await prisma.team.findUnique({
      where: { id: parseInt(params.id, 10) },
    });

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team data' }, { status: 500 });
  }
}

// PUT: Update a team
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { teamName, image } = body;

    // Validate input: Only require teamName, make image optional
    if (!teamName) {
      return NextResponse.json({ error: 'Team name is required' }, { status: 400 });
    }

    // Prepare data for update, conditionally include the image field if provided
    const updateData: { teamName: string; image?: string } = { teamName };
    if (image) {
      updateData.image = image;
    }

    // Update the team in the database
    const updatedTeam = await prisma.team.update({
      where: { id: Number(params.id) },
      data: updateData,
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
