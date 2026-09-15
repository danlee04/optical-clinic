import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from './container';

export function PageStub({ title, description }: { title: string; description: string }) {
  return (
    <Container className="py-24">
      <p className="text-sm font-semibold tracking-wide text-teal-soft uppercase">Coming soon</p>
      <h1 className="mt-2 text-4xl text-primary sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">{description}</p>
      <Button asChild className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </Container>
  );
}
