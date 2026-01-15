import { db } from '@/db';
import { contacts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { AdminHeader } from '@/components/admin-header';
import { ContactForm } from '@/components/contact-form';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditContactPage({ params }: PageProps) {
  const { id } = await params;
  const [contact] = await db
    .select()
    .from(contacts)
    .where(eq(contacts.id, parseInt(id)))
    .limit(1);

  if (!contact) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <ContactForm contact={contact} />
      </main>
    </div>
  );
}
