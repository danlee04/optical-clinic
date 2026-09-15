import { Icon } from '@/components/icon';
import { cn } from '@/lib/utils';

export function BentoGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-4 md:grid-cols-3',
        className,
      )}
      {...props}
    />
  );
}

export function BentoCard({
  icon,
  title,
  description,
  className,
}: {
  icon: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-6 rounded-card bg-card p-6 ring-1 ring-border transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-background text-primary">
        <Icon name={icon} className="size-6" />
      </span>
      <div>
        <h3 className="text-xl text-primary">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
