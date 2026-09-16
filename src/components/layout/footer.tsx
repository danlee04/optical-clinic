import { Glasses } from 'lucide-react';
import Link from 'next/link';
import { site } from '@/content/site';
import { Container } from './container';

// Evaluated once at build time (static export); outside the component to satisfy react-hooks/purity.
const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 font-display text-2xl">
            <Glasses aria-hidden="true" className="size-7" />
            {site.name}
          </p>
          <p className="mt-3 text-primary-foreground/85">{site.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6">
            {[...site.nav, site.cta, { href: '/privacy', label: 'Privacy notice' }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-primary-foreground/85 md:text-right">{site.footerNote}</p>
      </Container>
      <div className="border-t border-primary-foreground/15">
        <Container className="py-4 text-sm text-primary-foreground/85">
          © {YEAR} {site.name}
        </Container>
      </div>
    </footer>
  );
}
