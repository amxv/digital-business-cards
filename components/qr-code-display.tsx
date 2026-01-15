'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface QRCodeDisplayProps {
  url: string;
  name: string;
}

export function QRCodeDisplay({ url, name }: QRCodeDisplayProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      try {
        const dataUrl = await QRCode.toDataURL(url, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
        setQrDataUrl(dataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [url]);

  const handleDownload = () => {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
    link.href = qrDataUrl;
    link.click();
  };

  if (!qrDataUrl) {
    return (
      <div className="w-[300px] h-[300px] bg-gray-100 animate-pulse rounded-lg" />
    );
  }

  return (
    <div className="flex flex-col items-center">
      <img
        src={qrDataUrl}
        alt={`QR Code for ${name}`}
        className="w-[300px] h-[300px] rounded-lg shadow-md"
      />
      <Button
        variant="outline"
        className="mt-4"
        onClick={handleDownload}
      >
        <Download className="w-4 h-4 mr-2" />
        Download QR Code
      </Button>
    </div>
  );
}
