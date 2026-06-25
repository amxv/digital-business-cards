'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CardPreview } from '@/components/card-preview';
import { Eye } from 'lucide-react';
import type { Contact } from '@/db/schema';
import { appConfig } from '@/lib/app-config';

interface ContactFormProps {
  contact?: Contact;
}

export function ContactForm({ contact }: ContactFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    nameEn: contact?.nameEn || '',
    positionEn: contact?.positionEn || '',
    location: contact?.location || '',
    phone: contact?.phone || '',
    email: contact?.email || '',
    website: contact?.website || appConfig.defaultWebsite,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const url = contact ? `/api/contacts/${contact.id}` : '/api/contacts';
      const method = contact ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save contact');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save contact');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canGeneratePreview = formData.nameEn && formData.positionEn && formData.phone;

  return (
    <div className="max-w-5xl mx-auto">
      <div className={`grid gap-8 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>{contact ? 'Edit Contact' : 'Add New Contact'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Name Section */}
              <div className="space-y-2">
                <Label htmlFor="nameEn">Name *</Label>
                <Input
                  id="nameEn"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleChange}
                  placeholder="Alex Morgan"
                  required
                />
              </div>

              {/* Position Section */}
              <div className="space-y-2">
                <Label htmlFor="positionEn">Position *</Label>
                <Input
                  id="positionEn"
                  name="positionEn"
                  value={formData.positionEn}
                  onChange={handleChange}
                  placeholder="Sales Director"
                  required
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Regional Office, Dubai, UAE"
                  required
                />
              </div>

              {/* Phone with Generate Button */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555 123 4567"
                    required
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant={showPreview ? "default" : "outline"}
                    onClick={() => setShowPreview(!showPreview)}
                    disabled={!canGeneratePreview}
                    className={showPreview ? "bg-[#C4A35A] hover:bg-[#b39349]" : ""}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showPreview ? 'Hide Preview' : 'Generate'}
                  </Button>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@yourcompany.com"
                  required
                />
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder={appConfig.defaultWebsite}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#00A550] hover:bg-[#008a42]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : contact ? 'Update Contact' : 'Create Contact'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Card Preview */}
        {showPreview && (
          <div className="lg:sticky lg:top-8 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Card Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <CardPreview
                  nameEn={formData.nameEn}
                  positionEn={formData.positionEn}
                  location={formData.location}
                  phone={formData.phone}
                  email={formData.email}
                  website={formData.website}
                  slug={contact?.slug}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
