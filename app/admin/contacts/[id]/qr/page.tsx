import { db } from '@/db';
import { contacts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { AdminHeader } from '@/components/admin-header';
import { QRCodeDisplay } from '@/components/qr-code-display';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function QRCodePage({ params }: PageProps) {
  const { id } = await params;
  const [contact] = await db
    .select()
    .from(contacts)
    .where(eq(contacts.id, parseInt(id)))
    .limit(1);

  if (!contact) {
    notFound();
  }

  // Get the base URL from environment or default to localhost
  const baseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000';
  const contactUrl = `${baseUrl}/c/${contact.slug}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/admin" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Contacts
        </Link>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>{contact.nameEn}</CardTitle>
            <p className="text-gray-600">{contact.positionEn}</p>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <QRCodeDisplay url={contactUrl} name={contact.nameEn} />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-2">Contact URL:</p>
              <code className="text-sm bg-gray-100 px-3 py-1 rounded break-all">
                {contactUrl}
              </code>
            </div>

            <div className="mt-6 flex gap-3">
              <Link href={`/c/${contact.slug}`} target="_blank">
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Preview Page
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
