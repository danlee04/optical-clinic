import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Service } from '@/lib/types';

const pesos = new Intl.NumberFormat('en-PH');

type ServiceGridProps = {
  services: readonly Service[];
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  footerLink?: { href: string; label: string };
};

export function ServiceGrid({
  services,
  id,
  eyebrow,
  title,
  description,
  footerLink,
}: ServiceGridProps) {
  return (
    <section aria-labelledby={id} className="py-20">
      <Container>
        <SectionHeading id={id} eyebrow={eyebrow} title={title} description={description} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Card variant="white" className="flex h-full flex-col gap-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-sand text-primary">
                  <Icon name={service.icon} className="size-6" />
                </span>
                <h3 className="text-xl text-primary">
                  <Link
                    href={`/services/${service.slug}`}
                    className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {service.name}
                  </Link>
                </h3>
                <p className="flex-1 text-muted-foreground">{service.shortDescription}</p>
                <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock aria-hidden="true" className="size-4" />
                    {service.durationMinutes} min
                  </span>
                  {service.priceFrom ? (
                    <span className="font-semibold text-primary">
                      From ₱{pesos.format(service.priceFrom)}
                    </span>
                  ) : null}
                </p>
              </Card>
            </li>
          ))}
        </ul>
        {footerLink ? (
          <div className="mt-10">
            <Button asChild variant="outline">
              <Link href={footerLink.href}>
                {footerLink.label}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
