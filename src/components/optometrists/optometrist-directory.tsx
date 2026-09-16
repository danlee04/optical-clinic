'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import type { Optometrist } from '@/lib/types';
import { cn } from '@/lib/utils';

type Person = { optometrist: Optometrist; branchNames: readonly string[] };
type BranchOption = { slug: string; name: string };

export function OptometristDirectory({
  people,
  branches,
}: {
  people: readonly Person[];
  branches: readonly BranchOption[];
}) {
  const [branchSlug, setBranchSlug] = useState<string | null>(null);

  const selected = branches.find((branch) => branch.slug === branchSlug);
  const shown = branchSlug
    ? people.filter(({ optometrist }) => optometrist.branchSlugs.includes(branchSlug))
    : people;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by branch">
        {[{ slug: null, name: 'All branches' }, ...branches].map((option) => {
          const isSelected = option.slug === branchSlug;
          return (
            <button
              key={option.slug ?? 'all'}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setBranchSlug(option.slug)}
              className={cn(
                'inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                isSelected
                  ? 'border-transparent bg-primary text-primary-foreground'
                  : 'border-primary/50 text-primary hover:bg-secondary',
              )}
            >
              {option.name}
            </button>
          );
        })}
      </div>

      <p role="status" className="mt-4 text-sm text-muted-foreground">
        Showing {shown.length} optometrist{shown.length === 1 ? '' : 's'}
        {selected ? ` at ${selected.name}` : ''}
      </p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map(({ optometrist, branchNames }) => (
          <li key={optometrist.slug}>
            <Card className="flex h-full flex-col gap-4 p-0">
              <Image
                src={optometrist.photo.src}
                alt={optometrist.photo.alt}
                width={optometrist.photo.width}
                height={optometrist.photo.height}
                className="aspect-4/5 w-full rounded-t-card object-cover"
              />
              <div className="flex flex-1 flex-col gap-2 p-6 pt-0">
                <h2 className="text-xl text-primary">
                  {optometrist.name}, {optometrist.credentials}
                </h2>
                <p className="text-sm font-medium text-teal-soft">{branchNames.join(' · ')}</p>
                <p className="flex-1 text-muted-foreground">{optometrist.bio}</p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
