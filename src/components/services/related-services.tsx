import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import type { Service } from '@/lib/types';

export function RelatedServices({ services }: { services: readonly Service[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-3">
      {services.map((service) => (
        <li key={service.slug}>
          <Link
            href={`/services/${service.slug}`}
            className="flex min-h-11 items-center gap-3 rounded-card bg-card px-4 py-3 text-primary transition-colors duration-200 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Icon name={service.icon} className="size-5 shrink-0" />
            <span className="flex-1 font-medium">{service.name}</span>
            <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
