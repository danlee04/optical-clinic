import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { NumberTicker } from './number-ticker';

describe('NumberTicker', () => {
  it('server-renders the final formatted value', () => {
    const html = renderToString(<NumberTicker value={25000} suffix="+" />);
    expect(html).toContain('25,000+');
  });

  it('exposes the final value to screen readers only once', () => {
    render(<NumberTicker value={12} suffix="+" />);
    const matches = screen.getAllByText('12+');
    expect(matches).toHaveLength(2);
    expect(matches.filter((el) => el.getAttribute('aria-hidden') === 'true')).toHaveLength(1);
    expect(matches.filter((el) => el.classList.contains('sr-only'))).toHaveLength(1);
  });
});
