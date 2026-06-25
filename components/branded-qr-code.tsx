'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { appConfig, hasBrandLogo } from '@/lib/app-config';

interface BrandedQRCodeProps {
  url: string;
  size?: number;
  className?: string;
}

export function BrandedQRCode({ url, size = 200, className }: BrandedQRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = size;
      canvas.height = size;

      // Generate QR code data
      const qrData = QRCode.create(url, {
        errorCorrectionLevel: 'H', // High error correction for logo overlay
      });

      const modules = qrData.modules;
      const moduleCount = modules.size;
      const moduleSize = size / moduleCount;

      // Background color (cream/beige to match card)
      ctx.fillStyle = '#f5f0e6';
      ctx.fillRect(0, 0, size, size);

      // Draw QR code modules
      const finderSize = 7; // Finder pattern is 7x7 modules
      const green = '#00A550';
      const black = '#000000';

      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (!modules.get(row, col)) continue;

          const x = col * moduleSize;
          const y = row * moduleSize;

          // Check if this module is part of a finder pattern (corners)
          const isTopLeftFinder = row < finderSize && col < finderSize;
          const isTopRightFinder = row < finderSize && col >= moduleCount - finderSize;
          const isBottomLeftFinder = row >= moduleCount - finderSize && col < finderSize;
          const isFinder = isTopLeftFinder || isTopRightFinder || isBottomLeftFinder;

          // Use green for finder patterns, black for data
          ctx.fillStyle = isFinder ? green : black;

          // Draw rounded dots for a modern look
          const dotSize = moduleSize * 0.85;

          ctx.beginPath();
          ctx.arc(
            x + moduleSize / 2,
            y + moduleSize / 2,
            dotSize / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }

      // Draw the inner squares of finder patterns (white then green)
      const drawFinderInner = (startX: number, startY: number) => {
        // White ring (modules 1-5)
        ctx.fillStyle = '#f5f0e6';
        const whiteStart = moduleSize;
        const whiteSize = moduleSize * 5;
        ctx.fillRect(startX + whiteStart, startY + whiteStart, whiteSize, whiteSize);

        // Green center square (modules 2-4)
        ctx.fillStyle = green;
        const greenStart = moduleSize * 2;
        const greenSize = moduleSize * 3;
        ctx.fillRect(startX + greenStart, startY + greenStart, greenSize, greenSize);
      };

      // Apply to all three finder patterns
      drawFinderInner(0, 0); // Top-left
      drawFinderInner((moduleCount - finderSize) * moduleSize, 0); // Top-right
      drawFinderInner(0, (moduleCount - finderSize) * moduleSize); // Bottom-left

      const finalize = () => {
        setDataUrl(canvas.toDataURL('image/png'));
      };

      if (!hasBrandLogo()) {
        finalize();
        return;
      }

      // Load and draw logo in center
      const logo = new window.Image();
      logo.crossOrigin = 'anonymous';
      logo.src = appConfig.logoPath;

      logo.onload = () => {
        const logoSize = size * 0.22;
        const logoX = (size - logoSize) / 2;
        const logoY = (size - logoSize) / 2;

        // White background circle for logo
        ctx.fillStyle = '#f5f0e6';
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, logoSize * 0.65, 0, Math.PI * 2);
        ctx.fill();

        // Draw logo
        ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

        finalize();
      };

      logo.onerror = finalize;
    };

    generateQR();
  }, [url, size]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {dataUrl ? (
        <Image
          src={dataUrl}
          alt="QR Code"
          width={size}
          height={size}
          unoptimized
          className={className}
          style={{ width: size, height: size }}
        />
      ) : (
        <div className={className} style={{ width: size, height: size, background: '#f5f0e6' }} />
      )}
    </>
  );
}
