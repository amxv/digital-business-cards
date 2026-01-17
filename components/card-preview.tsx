'use client';

import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import Image from 'next/image';
import { BrandedQRCode } from './branded-qr-code';

interface CardPreviewProps {
  nameEn: string;
  nameAr?: string;
  positionEn: string;
  positionAr?: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  slug?: string;
}

export function CardPreview({
  nameEn,
  nameAr,
  positionEn,
  positionAr,
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
      {/* English Side */}
      <div className="relative">
        <p className="text-sm font-medium text-gray-500 mb-2">Front (English)</p>
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
          {/* NFC Icon */}
          <div className="absolute top-4 left-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5">
              <path d="M6 12c0-3.3 2.7-6 6-6" strokeLinecap="round" />
              <path d="M6 6c0 5 4 9 9 9" strokeLinecap="round" />
              <path d="M6 18c0-6.6 5.4-12 12-12" strokeLinecap="round" />
            </svg>
          </div>

          {/* Lulu Logo */}
          <div className="absolute top-3 right-4">
            <Image
              src="/lulu-logo.png"
              alt="Lulu Group International"
              width={100}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex">
            {/* Left Side - Info */}
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
                  <span className="text-gray-700 text-xs">{email || 'email@lulumea.com'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#C4A35A]" />
                  <span className="text-gray-700 text-xs">{website || 'luluhypermarket.com'}</span>
                </div>
              </div>
            </div>

            {/* Right Side - QR */}
            <div className="flex items-center justify-center pr-6">
              <BrandedQRCode url={qrUrl} size={112} className="rounded-lg" />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-[#8B1538] to-[#C4A35A]" />
        </div>
      </div>

      {/* Arabic Side */}
      <div className="relative">
        <p className="text-sm font-medium text-gray-500 mb-2">Back (Arabic)</p>
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
          dir="rtl"
        >
          {/* NFC Icon */}
          <div className="absolute top-4 right-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" style={{ transform: 'scaleX(-1)' }}>
              <path d="M6 12c0-3.3 2.7-6 6-6" strokeLinecap="round" />
              <path d="M6 6c0 5 4 9 9 9" strokeLinecap="round" />
              <path d="M6 18c0-6.6 5.4-12 12-12" strokeLinecap="round" />
            </svg>
          </div>

          {/* Lulu Logo Arabic */}
          <div className="absolute top-3 left-4">
            <Image
              src="/lulu-logo.png"
              alt="مجموعة اللولو العالمية"
              width={100}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex">
            {/* Left Side - QR */}
            <div className="flex items-center justify-center pl-6">
              <BrandedQRCode url={qrUrl} size={112} className="rounded-lg" />
            </div>

            {/* Right Side - Info */}
            <div className="flex-1 pt-14 pr-6 pl-4 text-right">
              <h2 className="text-2xl font-bold text-gray-900 mb-0.5 font-arabic">
                {nameAr || nameEn || 'الاسم'}
              </h2>
              <p className="text-sm font-semibold text-[#C4A35A] mb-0.5 font-arabic">
                {positionAr || positionEn || 'المنصب'}
              </p>
              <p className="text-xs text-gray-600 mb-4 font-arabic">
                {location ? 'المملكة العربية السعودية' : 'الموقع'}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-gray-700 text-xs font-arabic">المملكة العربية السعودية</span>
                  <MapPin className="w-4 h-4 text-[#C4A35A]" />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-gray-700 text-xs" dir="ltr">{phone || '+XXX XX XXX XXXX'}</span>
                  <span className="text-gray-700 text-xs font-arabic">تليفون:</span>
                  <Phone className="w-4 h-4 text-[#C4A35A]" />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-gray-700 text-xs" dir="ltr">{email || 'email@lulumea.com'}</span>
                  <Mail className="w-4 h-4 text-[#C4A35A]" />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-gray-700 text-xs" dir="ltr">{website || 'luluhypermarket.com'}</span>
                  <Globe className="w-4 h-4 text-[#C4A35A]" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-l from-[#8B1538] to-[#C4A35A]" />
        </div>
      </div>
    </div>
  );
}
