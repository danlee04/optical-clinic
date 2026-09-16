import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';

export function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="bg-primary py-16 text-primary-foreground">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 id="cta-heading" className="text-3xl sm:text-4xl">
            Ready for clearer vision?
          </h2>
          <p className="mt-3 max-w-xl text-primary-foreground/85">
            Walk in at any branch or get in touch, and we will find a time that suits you.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="accent" size="lg">
            <Link href="/branches">Find a branch</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
