import { NextResponse } from 'next/server';
import { db } from '@/db';
import { contacts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { generateVCard } from '@/lib/vcard';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const [contact] = await db
      .select()
      .from(contacts)
      .where(eq(contacts.slug, slug))
      .limit(1);

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    const vcard = generateVCard(contact);

    return new NextResponse(vcard, {
      status: 200,
      headers: {
        'Content-Type': 'text/vcard',
        'Content-Disposition': `attachment; filename="${contact.slug}.vcf"`,
      },
    });
  } catch (error) {
    console.error('Error generating vCard:', error);
    return NextResponse.json(
      { error: 'Failed to generate vCard' },
      { status: 500 }
    );
  }
}
