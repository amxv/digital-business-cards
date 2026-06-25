import { NextResponse } from 'next/server';
import { db } from '@/db';
import { contacts } from '@/db/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import { appConfig } from '@/lib/app-config';

// GET /api/contacts/[id] - Get single contact
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [contact] = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, parseInt(id)))
      .limit(1);

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact' },
      { status: 500 }
    );
  }
}

// PUT /api/contacts/[id] - Update contact
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Generate slug from English name if name changed
    const slug = body.nameEn
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const [updatedContact] = await db
      .update(contacts)
      .set({
        slug,
        nameEn: body.nameEn,
        positionEn: body.positionEn,
        location: body.location,
        phone: body.phone,
        email: body.email,
        website: body.website || appConfig.defaultWebsite,
        updatedAt: new Date(),
      })
      .where(eq(contacts.id, parseInt(id)))
      .returning();

    if (!updatedContact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

// DELETE /api/contacts/[id] - Delete contact
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const [deletedContact] = await db
      .delete(contacts)
      .where(eq(contacts.id, parseInt(id)))
      .returning();

    if (!deletedContact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}
