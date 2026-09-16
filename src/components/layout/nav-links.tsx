'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/content/site';
import { cn } from '@/lib/utils';

export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {site.nav.map((item) => {
        const isCurrent = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isCurrent ? 'page' : undefined}
              className={cn(
                'inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                isCurrent && 'bg-muted text-primary',
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
