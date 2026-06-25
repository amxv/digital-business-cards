'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { appConfig, hasBrandLogo } from '@/lib/app-config';

interface QRCodeDisplayProps {
  url: string;
  name: string;
}

export function QRCodeDisplay({ url, name }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const size = 300;
      canvas.width = size;
      canvas.height = size;

      // Generate QR code data
      const qrData = QRCode.create(url, {
        errorCorrectionLevel: 'H',
      });

      const modules = qrData.modules;
      const moduleCount = modules.size;
      const moduleSize = size / moduleCount;

      // Background color (cream/beige)
      ctx.fillStyle = '#f5f0e6';
      ctx.fillRect(0, 0, size, size);

      // Draw QR code modules
      const finderSize = 7;
      const green = '#00A550';
      const black = '#000000';

      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (!modules.get(row, col)) continue;

          const x = col * moduleSize;
          const y = row * moduleSize;

          const isTopLeftFinder = row < finderSize && col < finderSize;
          const isTopRightFinder = row < finderSize && col >= moduleCount - finderSize;
          const isBottomLeftFinder = row >= moduleCount - finderSize && col < finderSize;
          const isFinder = isTopLeftFinder || isTopRightFinder || isBottomLeftFinder;

          ctx.fillStyle = isFinder ? green : black;

          const dotSize = moduleSize * 0.85;
          ctx.beginPath();
          ctx.arc(x + moduleSize / 2, y + moduleSize / 2, dotSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw finder pattern inner squares
      const drawFinderInner = (startX: number, startY: number) => {
        ctx.fillStyle = '#f5f0e6';
        ctx.fillRect(startX + moduleSize, startY + moduleSize, moduleSize * 5, moduleSize * 5);
        ctx.fillStyle = green;
        ctx.fillRect(startX + moduleSize * 2, startY + moduleSize * 2, moduleSize * 3, moduleSize * 3);
      };

      drawFinderInner(0, 0);
      drawFinderInner((moduleCount - finderSize) * moduleSize, 0);
      drawFinderInner(0, (moduleCount - finderSize) * moduleSize);

      const finalize = () => {
        setDataUrl(canvas.toDataURL('image/png'));
      };

      if (!hasBrandLogo()) {
        finalize();
        return;
      }

      // Load and draw logo
      const logo = new window.Image();
      logo.crossOrigin = 'anonymous';
      logo.src = appConfig.logoPath;

      logo.onload = () => {
        const logoSize = size * 0.22;
        const logoX = (size - logoSize) / 2;
        const logoY = (size - logoSize) / 2;

        ctx.fillStyle = '#f5f0e6';
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, logoSize * 0.65, 0, Math.PI * 2);
        ctx.fill();

        ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
        finalize();
      };

      logo.onerror = finalize;
    };

    generateQR();
  }, [url]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {dataUrl ? (
        <Image
          src={dataUrl}
          alt={`QR Code for ${name}`}
          width={300}
          height={300}
          unoptimized
          className="w-[300px] h-[300px] rounded-lg shadow-md"
        />
      ) : (
        <div className="w-[300px] h-[300px] bg-gray-100 animate-pulse rounded-lg" />
      )}
      <Button
        variant="outline"
        className="mt-4"
        onClick={handleDownload}
        disabled={!dataUrl}
      >
        <Download className="w-4 h-4 mr-2" />
        Download QR Code
      </Button>
    </div>
  );
}
