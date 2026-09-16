'use client';

import { Pause, Play, Star } from 'lucide-react';
import { useState } from 'react';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Marquee } from '@/components/motion/marquee';
import { Button } from '@/components/ui/button';
import type { Testimonial } from '@/lib/types';

function Stars({ rating }: { rating: Testimonial['rating'] }) {
  return (
    <span role="img" aria-label={`Rated ${rating} out of 5`} className="flex gap-0.5 text-primary">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className="size-4"
          fill={index < rating ? 'currentColor' : 'none'}
        />
      ))}
    </span>
  );
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-labelledby="testimonials-heading" className="overflow-hidden bg-sand/40 py-20">
      <Container className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Kind words"
          title="What our patients say"
        />
        <Button
          variant="outline"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          className="motion-reduce:hidden"
        >
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          {paused ? 'Play testimonials' : 'Pause testimonials'}
        </Button>
      </Container>
      <Marquee paused={paused} className="mt-10 px-4">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.id}
            className="flex w-80 shrink-0 flex-col gap-4 rounded-card bg-white p-6 ring-1 ring-border"
          >
            <Stars rating={testimonial.rating} />
            <blockquote className="flex-1 text-foreground">“{testimonial.content}”</blockquote>
            <figcaption className="text-sm font-medium text-muted-foreground">
              {testimonial.author}
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}
