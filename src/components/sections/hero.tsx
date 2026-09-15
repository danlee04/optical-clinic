import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { site } from '@/content/site';
import { cn } from '@/lib/utils';

// Signature animation for Home: a one-time staggered CSS entrance. It needs no JavaScript, the
// content is in the HTML at full opacity once the animation ends, and reduced motion shows the
// final state immediately (motion-reduce:animate-none plus the global reduced-motion rule).
const rise =
  'animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-600 ease-out motion-reduce:animate-none';
const pop =
  'animate-in fade-in zoom-in-90 fill-mode-both duration-600 ease-out motion-reduce:animate-none';

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <Container className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className={cn(rise, 'text-sm font-semibold tracking-wide text-teal-soft uppercase')}>
            {site.hero.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className={cn(
              rise,
              'mt-3 text-4xl leading-tight text-primary delay-100 sm:text-5xl lg:text-6xl',
            )}
          >
            {site.hero.title}
          </h1>
          <p className={cn(rise, 'mt-6 max-w-xl text-lg text-muted-foreground delay-200')}>
            {site.hero.description}
          </p>
          <div className={cn(rise, 'mt-8 flex flex-wrap gap-3 delay-300')}>
            <Button asChild variant="accent" size="lg">
              <Link href="/branches">
                <MapPin aria-hidden="true" />
                Find a branch
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">
                Our services
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-md">
          <div className={cn(pop, 'absolute inset-0 rounded-full bg-sand')} />
          <div
            className={cn(
              pop,
              'absolute top-[30%] left-[8%] size-[42%] rounded-full border-[14px] border-primary bg-cream/60 delay-150',
            )}
          />
          <div
            className={cn(
              pop,
              'absolute top-[30%] right-[8%] size-[42%] rounded-full border-[14px] border-primary bg-cream/60 delay-200',
            )}
          />
          <div
            className={cn(
              pop,
              'absolute top-[42%] left-[45%] h-[14px] w-[10%] rounded-full bg-primary delay-300',
            )}
          />
          <div
            className={cn(
              pop,
              'absolute top-[6%] right-[6%] size-[18%] rounded-full bg-accent delay-500',
            )}
          />
        </div>
      </Container>
    </section>
  );
}
