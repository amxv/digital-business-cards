'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { appConfig } from '@/lib/app-config';
import { BrandMark } from '@/components/brand-mark';

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
          <BrandMark showLabel={false} iconClassName="h-9 w-9 rounded-xl" />
          <span className="text-lg font-semibold text-slate-900">
            {appConfig.appName}
          </span>
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
