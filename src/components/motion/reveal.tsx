import { cn } from '@/lib/utils';

// Scroll-driven fade/slide-up in pure CSS (see `.reveal` in globals.css). Content is always in the
// HTML and visible without JavaScript; browsers without animation-timeline support and
// reduced-motion users simply see it without animation.
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('reveal', className)}>{children}</div>;
}
