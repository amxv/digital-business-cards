import { ContactRound } from 'lucide-react';

import { appConfig } from '@/lib/app-config';

interface BrandMarkProps {
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

export function BrandMark({
  className = '',
  iconClassName = '',
  labelClassName = '',
  showLabel = true,
}: BrandMarkProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-[#14b8a6] shadow-sm ${iconClassName}`.trim()}
      >
        <ContactRound className="h-6 w-6" strokeWidth={2.2} />
      </div>
      {showLabel ? (
        <span className={`text-lg font-semibold tracking-tight text-slate-900 ${labelClassName}`.trim()}>
          {appConfig.appName}
        </span>
      ) : null}
    </div>
  );
}
