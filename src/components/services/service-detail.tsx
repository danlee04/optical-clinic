import { Clock, MapPin, Wallet } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { RelatedServices } from '@/components/services/related-services';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Branch, Service } from '@/lib/types';

const pesos = new Intl.NumberFormat('en-PH');

export function ServiceDetail({
  service,
  branches,
  related,
}: {
  service: Service;
  branches: readonly Branch[];
  related: readonly Service[];
}) {
  const paragraphs = service.description.split('\n\n');

  return (
    <>
      <Container className="grid items-center gap-10 py-16 md:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-teal-soft uppercase">
            <Icon name={service.icon} className="size-5" />
            Service
          </p>
          <h1 className="mt-3 text-4xl text-primary sm:text-5xl">{service.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{service.shortDescription}</p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <div className="flex items-center gap-2">
              <Clock aria-hidden="true" className="size-5 text-teal-soft" />
              <dt className="sr-only">Typical appointment length</dt>
              <dd className="font-medium text-primary">{service.durationMinutes} minutes</dd>
            </div>
            {service.priceFrom === undefined ? null : (
              <div className="flex items-center gap-2">
                <Wallet aria-hidden="true" className="size-5 text-teal-soft" />
                <dt className="sr-only">Starting price</dt>
                <dd className="font-medium text-primary">
                  Starts at ₱{pesos.format(service.priceFrom)}
                </dd>
              </div>
            )}
          </dl>
          <Button asChild variant="accent" size="lg" className="mt-8">
            <Link href="/contact">Ask about this service</Link>
          </Button>
        </div>
        <Image
          src={service.image.src}
          alt={service.image.alt}
          width={service.image.width}
          height={service.image.height}
          className="aspect-4/3 w-full rounded-card object-cover"
          priority
        />
      </Container>

      <section aria-labelledby="about-heading" className="pb-16">
        <Container className="max-w-3xl">
          <SectionHeading id="about-heading" title={`What to expect`} />
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-4 text-lg text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </Container>
      </section>

      <section aria-labelledby="available-heading" className="bg-sand/40 py-16">
        <Container>
          <SectionHeading id="available-heading" title="Available at" />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {branches.map((branch) => (
              <li key={branch.slug}>
                <Card variant="white" className="flex h-full flex-col gap-2">
                  <h3 className="text-lg text-primary">{branch.name}</h3>
                  <p className="flex flex-1 gap-2 text-sm text-muted-foreground">
                    <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                    <span>
                      {branch.address}, {branch.city}
                    </span>
                  </p>
                  <a
                    href={`tel:${branch.phone}`}
                    aria-label={`Call ${branch.name}`}
                    className="inline-flex min-h-11 items-center font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {branch.phone}
                  </a>
                </Card>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="mt-8">
            <Link href="/branches">See branch details</Link>
          </Button>
        </Container>
      </section>

      <section aria-labelledby="related-heading" className="py-16">
        <Container>
          <SectionHeading id="related-heading" title="Other services" />
          <RelatedServices services={related} />
        </Container>
      </section>
    </>
  );
}
