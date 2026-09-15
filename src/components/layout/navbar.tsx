import { Glasses } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { site } from '@/content/site';
import { Container } from './container';
import { MobileNav } from './mobile-nav';
import { NavLinks } from './nav-links';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2 font-display text-xl text-primary"
          aria-label={`${site.name} home`}
        >
          <Glasses aria-hidden="true" className="size-7" />
          <span>{site.shortName}</span>
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="accent" className="hidden md:inline-flex">
            <Link href={site.cta.href}>{site.cta.label}</Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
