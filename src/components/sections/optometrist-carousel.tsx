'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Optometrist } from '@/lib/types';

type Person = { optometrist: Optometrist; branchNames: string[] };

export function OptometristCarousel({ people }: { people: Person[] }) {
  return (
    <section aria-labelledby="optometrists-heading" className="py-20">
      <Container>
        <SectionHeading
          id="optometrists-heading"
          eyebrow="Our team"
          title="Meet our optometrists"
          description="Licensed Doctors of Optometry who take the time to listen."
        />
        <Carousel opts={{ align: 'start' }} aria-label="Our optometrists" className="mt-10">
          <CarouselContent>
            {people.map(({ optometrist, branchNames }) => (
              <CarouselItem key={optometrist.slug} className="basis-4/5 sm:basis-1/2 lg:basis-1/3">
                <article className="h-full overflow-hidden rounded-card bg-card">
                  <Image
                    src={optometrist.photo.src}
                    alt={optometrist.photo.alt}
                    width={optometrist.photo.width}
                    height={optometrist.photo.height}
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl text-primary">
                      {optometrist.name}, {optometrist.credentials}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{branchNames.join(' · ')}</p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex items-center justify-between gap-4">
            <Button asChild variant="outline">
              <Link href="/optometrists">
                Meet the team
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <div className="flex gap-2">
              <CarouselPrevious className="static inset-auto my-0 translate-x-0 translate-y-0" />
              <CarouselNext className="static inset-auto my-0 translate-x-0 translate-y-0" />
            </div>
          </div>
        </Carousel>
      </Container>
    </section>
  );
}
