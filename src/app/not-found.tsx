import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-display text-6xl text-teal-soft">404</p>
      <h1 className="mt-4 text-4xl text-primary">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
        The page you are looking for moved or never existed. These links will get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/services">Services</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/branches">Branches</Link>
        </Button>
      </div>
    </Container>
  );
}
