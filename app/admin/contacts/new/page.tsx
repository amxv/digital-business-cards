import { AdminHeader } from '@/components/admin-header';
import { ContactForm } from '@/components/contact-form';

export default function NewContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <ContactForm />
      </main>
    </div>
  );
}
