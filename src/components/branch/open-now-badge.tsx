'use client';

import { useSyncExternalStore } from 'react';
import { isOpenAt } from '@/lib/hours';
import type { WeeklyHours } from '@/lib/types';
import { cn } from '@/lib/utils';

type Status = 'unknown' | 'open' | 'closed';

function subscribeToMinuteTicks(onTick: () => void) {
  const id = window.setInterval(onTick, 60_000);
  return () => window.clearInterval(id);
}

const LABELS: Record<Status, string> = {
  unknown: 'See opening hours',
  open: 'Open now',
  closed: 'Closed now',
};

export function OpenNowBadge({ hours, className }: { hours: WeeklyHours; className?: string }) {
  // The server snapshot is 'unknown', so static HTML never freezes a build-time open/closed state
  // and hydration matches; the browser then computes the real status in Asia/Manila time.
  const status = useSyncExternalStore<Status>(
    subscribeToMinuteTicks,
    () => (isOpenAt(hours, new Date()) ? 'open' : 'closed'),
    () => 'unknown',
  );

  return (
    <span
      data-status={status}
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium',
        status === 'open' && 'bg-emerald-50 text-emerald-800',
        status === 'closed' && 'bg-background text-ink',
        status === 'unknown' && 'bg-background text-muted-foreground',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'size-2 rounded-full',
          status === 'open' && 'bg-emerald-600',
          status === 'closed' && 'bg-destructive',
          status === 'unknown' && 'bg-muted-foreground',
        )}
      />
      {LABELS[status]}
    </span>
  );
}
