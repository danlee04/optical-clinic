import { cn } from '@/lib/utils';

export function Marquee({
  children,
  className,
  paused = false,
  repeat = 2,
}: {
  children: React.ReactNode;
  className?: string;
  paused?: boolean;
  repeat?: number;
}) {
  return (
    <div
      className={cn(
        'group flex gap-(--gap) overflow-hidden [--duration:48s] [--gap:1.5rem] motion-reduce:overflow-visible',
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, index) => (
        <div
          key={index}
          data-slot="marquee-track"
          aria-hidden={index > 0 ? true : undefined}
          className={cn(
            'flex shrink-0 animate-marquee justify-around gap-(--gap) group-hover:[animation-play-state:paused]',
            'motion-reduce:shrink motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center',
            paused && '[animation-play-state:paused]',
            index > 0 && 'motion-reduce:hidden',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
