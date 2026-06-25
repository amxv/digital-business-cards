import { db } from '@/db';
import { contacts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MapPin, Phone, Mail, Globe, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { appConfig } from '@/lib/app-config';
import { BrandMark } from '@/components/brand-mark';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [contact] = await db
    .select()
    .from(contacts)
    .where(eq(contacts.slug, slug))
    .limit(1);

  if (!contact) {
    return {
      title: 'Contact Not Found',
    };
  }

  return {
    title: `${contact.nameEn} - ${appConfig.appName}`,
    description: `${contact.positionEn} at ${appConfig.organizationName}`,
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { slug } = await params;
  const [contact] = await db
    .select()
    .from(contacts)
    .where(eq(contacts.slug, slug))
    .limit(1);

  if (!contact) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f0e8] to-white">
      {/* Header with Logo */}
      <header className="pt-8 pb-4 px-6">
        <div className="flex justify-center">
          <BrandMark
            className="rounded-2xl bg-white/80 px-4 py-3 shadow-sm ring-1 ring-slate-200"
            iconClassName="h-10 w-10 rounded-xl"
            labelClassName="text-2xl"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-12">
        <div className="max-w-md mx-auto">
          {/* Name & Title Card */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {contact.nameEn}
            </h1>
            <p className="text-lg text-[#00A550] font-medium">
              {contact.positionEn}
            </p>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 space-y-4">
            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#00A550]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#00A550]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-900">{contact.location}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#00A550]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#00A550]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="text-gray-900 hover:text-[#00A550]"
                >
                  {contact.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#00A550]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#00A550]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-gray-900 hover:text-[#00A550] break-all"
                >
                  {contact.email}
                </a>
              </div>
            </div>

            {/* Website */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#00A550]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-[#00A550]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <a
                  href={`https://${contact.website || appConfig.defaultWebsite}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-[#00A550]"
                >
                  {contact.website || appConfig.defaultWebsite}
                </a>
              </div>
            </div>
          </div>

          {/* Save Contact Button */}
          <a href={`/api/vcard/${contact.slug}`} download={`${contact.slug}.vcf`}>
            <Button
              className="w-full h-14 text-lg bg-[#00A550] hover:bg-[#008a42] text-white rounded-xl shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Save Contact
            </Button>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-6">
        <div className="text-center text-sm text-gray-500">
          <p>{appConfig.organizationName}</p>
        </div>
      </footer>
    </div>
  );
}
