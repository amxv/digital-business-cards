'use client';

import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import Image from 'next/image';
import { BrandedQRCode } from './branded-qr-code';
import { appConfig, hasBrandLogo } from '@/lib/app-config';

interface CardPreviewProps {
  nameEn: string;
  positionEn: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  slug?: string;
}

export function CardPreview({
  nameEn,
  positionEn,
  location,
  phone,
  email,
  website,
  slug,
}: CardPreviewProps) {
  const qrUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/c/${slug || 'preview'}`
    : `/c/${slug || 'preview'}`;

  return (
    <div className="space-y-6">
      <div className="relative">
        <p className="text-sm font-medium text-gray-500 mb-2">Card Preview</p>
        <div
          className="relative w-full aspect-[1.75] rounded-lg overflow-hidden shadow-lg"
          style={{
            background: `
              linear-gradient(135deg, rgba(196, 163, 90, 0.08) 25%, transparent 25%),
              linear-gradient(225deg, rgba(196, 163, 90, 0.08) 25%, transparent 25%),
              linear-gradient(45deg, rgba(196, 163, 90, 0.08) 25%, transparent 25%),
              linear-gradient(315deg, rgba(196, 163, 90, 0.08) 25%, transparent 25%),
              #f5f0e6
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 0, 20px -20px, 0px 20px',
          }}
        >
          <div className="absolute top-4 left-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5">
              <path d="M6 12c0-3.3 2.7-6 6-6" strokeLinecap="round" />
              <path d="M6 6c0 5 4 9 9 9" strokeLinecap="round" />
              <path d="M6 18c0-6.6 5.4-12 12-12" strokeLinecap="round" />
            </svg>
          </div>

          <div className="absolute top-3 right-4">
            {hasBrandLogo() ? (
              <Image
                src={appConfig.logoPath}
                alt={appConfig.logoAlt}
                width={100}
                height={36}
                className="h-8 w-auto"
              />
            ) : (
              <span className="text-sm font-semibold text-slate-800">
                {appConfig.appName}
              </span>
            )}
          </div>

          <div className="absolute inset-0 flex">
            <div className="flex-1 pt-14 pl-6 pr-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-0.5">{nameEn || 'Name'}</h2>
              <p className="text-sm font-semibold text-[#C4A35A] tracking-wide uppercase mb-0.5">
                {positionEn || 'Position'}
              </p>
              <p className="text-xs text-gray-600 mb-4">
                {location ? location.split(',').slice(-2).join(',').trim() : 'Location'}
              </p>

              <div className="space-y-2 text-sm pb-5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C4A35A]" />
                  <span className="text-gray-700 text-xs">{location || 'Office Location'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C4A35A]" />
                  <span className="text-gray-700 text-xs">{phone || '+XXX XX XXX XXXX'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C4A35A]" />
                  <span className="text-gray-700 text-xs">{email || 'name@example.com'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#C4A35A]" />
                  <span className="text-gray-700 text-xs">{website || appConfig.defaultWebsite}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center pr-6">
              <BrandedQRCode url={qrUrl} size={112} className="rounded-lg" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-[#0F172A] via-[#14B8A6] to-[#C4A35A]" />
        </div>
      </div>
    </div>
  );
}
