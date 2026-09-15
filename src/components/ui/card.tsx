import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva('rounded-card p-6', {
  variants: {
    variant: {
      sand: 'bg-card text-card-foreground',
      white: 'bg-white text-card-foreground shadow-sm ring-1 ring-border',
      teal: 'bg-primary text-primary-foreground',
    },
  },
  defaultVariants: { variant: 'sand' },
});

function Card({
  className,
  variant = 'sand',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Card, cardVariants };
