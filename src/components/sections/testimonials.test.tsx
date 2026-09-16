import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getTestimonials } from '@/lib/content';
import { Testimonials } from './testimonials';

describe('Testimonials', () => {
  // One 5-star and one 4-star testimonial so a wrong rating actually fails the test.
  const testimonials = getTestimonials().filter((testimonial) =>
    ['bea-l', 'carlo-s'].includes(testimonial.id),
  );

  it('announces each rating in words', () => {
    const { container } = render(<Testimonials testimonials={testimonials} />);
    // Marquee duplicates its content into an aria-hidden copy for the seamless loop, so scope
    // the assertion to the single visible track.
    const visibleTrack = container.querySelector('[data-slot="marquee-track"]:not([aria-hidden])');
    expect(visibleTrack).not.toBeNull();
    expect(within(visibleTrack as HTMLElement).getAllByLabelText('Rated 5 out of 5')).toHaveLength(
      1,
    );
    expect(within(visibleTrack as HTMLElement).getAllByLabelText('Rated 4 out of 5')).toHaveLength(
      1,
    );
  });

  it('toggles the marquee between paused and playing', () => {
    const { container } = render(<Testimonials testimonials={testimonials} />);
    const track = () => container.querySelector('[data-slot="marquee-track"]');
    const toggle = screen.getByRole('button', { name: 'Pause testimonials' });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(track()?.classList.contains('[animation-play-state:paused]')).toBe(false);

    fireEvent.click(toggle);

    expect(screen.getByRole('button', { name: 'Play testimonials' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(track()?.classList.contains('[animation-play-state:paused]')).toBe(true);
  });
});
