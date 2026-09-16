'use client';

import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

const numberFormat = new Intl.NumberFormat('en-PH');

export function NumberTicker({
  value,
  suffix = '',
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const finalText = `${numberFormat.format(value)}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduceMotion) return;
    // Write to the DOM directly: no state updates inside the effect, and the
    // server-rendered final value stays correct for crawlers and no-JS visitors.
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (latest) => {
        node.textContent = `${numberFormat.format(Math.round(latest))}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, suffix]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" data-slot="number-ticker-value">
        {finalText}
      </span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
}
