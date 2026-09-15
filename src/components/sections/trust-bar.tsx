import { Container } from '@/components/layout/container';
import { NumberTicker } from '@/components/motion/number-ticker';

type Stat = { value: number; suffix?: string; label: string };

export function TrustBar({ stats }: { stats: readonly Stat[] }) {
  return (
    <section aria-label="Clearview at a glance" className="border-y border-border bg-sand/60">
      <Container>
        <dl className="grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center text-center">
              <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="font-display text-3xl text-primary sm:text-4xl">
                <NumberTicker value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
