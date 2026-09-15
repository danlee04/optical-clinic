import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Marquee } from './marquee';

describe('Marquee', () => {
  it('repeats content and hides the copies from assistive technology', () => {
    const { container } = render(
      <Marquee repeat={3}>
        <p>Great service</p>
      </Marquee>,
    );
    const tracks = container.querySelectorAll('[data-slot="marquee-track"]');
    expect(tracks).toHaveLength(3);
    expect(tracks[0]).not.toHaveAttribute('aria-hidden');
    expect(tracks[1]).toHaveAttribute('aria-hidden', 'true');
    expect(tracks[2]).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getAllByText('Great service')).toHaveLength(3);
  });

  it('pauses the animation only when paused', () => {
    const { container, rerender } = render(
      <Marquee>
        <p>Item</p>
      </Marquee>,
    );
    const track = () => container.querySelector('[data-slot="marquee-track"]');
    expect(track()?.classList.contains('[animation-play-state:paused]')).toBe(false);

    rerender(
      <Marquee paused>
        <p>Item</p>
      </Marquee>,
    );
    expect(track()?.classList.contains('[animation-play-state:paused]')).toBe(true);
  });
});
