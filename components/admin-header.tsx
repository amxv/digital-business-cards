'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { appConfig, hasBrandLogo } from '@/lib/app-config';

export function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
          router.refresh();
        },
      },
    });
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/admin" className="flex items-center gap-3">
          {hasBrandLogo() ? (
            <Image
              src={appConfig.logoPath}
              alt={appConfig.logoAlt}
              width={appConfig.logoWidth}
              height={appConfig.logoHeight}
              className="h-8 w-auto"
            />
          ) : (
            <span className="text-lg font-semibold text-slate-900">
              {appConfig.appName}
            </span>
          )}
          <span className="text-gray-400">|</span>
          <span className="font-medium text-gray-700">{appConfig.adminTitle}</span>
        </Link>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </header>
  );
}
