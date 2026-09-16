import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getServices } from '@/lib/content';
import Page from './page';

describe('Services page', () => {
  it('has one h1 and no "coming soon" text', () => {
    render(<Page />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
  });

  it('lists every service with a link to its detail page', () => {
    render(<Page />);
    for (const service of getServices()) {
      expect(screen.getByRole('link', { name: `${service.name}` })).toHaveAttribute(
        'href',
        `/services/${service.slug}`,
      );
    }
  });
});
