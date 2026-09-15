import { ArrowRight, MapPin, Navigation, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { OpenNowBadge } from '@/components/branch/open-now-badge';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Button } from '@/components/ui/button';
import type { Branch } from '@/lib/types';

type BranchCardsProps = {
  branches: Branch[];
  id: string;
  title: string;
  description?: string;
};

function directionsUrl({ lat, lng }: Branch['coordinates']) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function BranchCards({ branches, id, title, description }: BranchCardsProps) {
  return (
    <section aria-labelledby={id} className="py-20">
      <Container>
        <SectionHeading id={id} eyebrow="Visit us" title={title} description={description} />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {branches.map((branch) => {
            const image = branch.images[0];
            return (
              <li key={branch.slug} className="flex flex-col overflow-hidden rounded-card bg-card">
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="aspect-[3/2] w-full object-cover"
                  />
                ) : null}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <OpenNowBadge hours={branch.hours} className="self-start" />
                  <h3 className="text-2xl text-primary">{branch.name}</h3>
                  <p className="flex flex-1 gap-2 text-muted-foreground">
                    <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0" />
                    <span>
                      {branch.address}, {branch.city}
                    </span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button asChild size="sm">
                      <a href={`tel:${branch.phone}`} aria-label={`Call ${branch.name}`}>
                        <Phone aria-hidden="true" />
                        Call
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={directionsUrl(branch.coordinates)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Directions to ${branch.name} (opens in a new tab)`}
                      >
                        <Navigation aria-hidden="true" />
                        Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-10">
          <Button asChild variant="outline">
            <Link href="/branches">
              See all branches
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
