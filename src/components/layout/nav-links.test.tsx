import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { site } from '@/content/site';
import { NavLinks } from './nav-links';

vi.mock('next/navigation', () => ({ usePathname: () => '/branches' }));

describe('NavLinks', () => {
  it('renders every nav item as a link', () => {
    render(<NavLinks />);
    for (const item of site.nav) {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute('href', item.href);
    }
  });

  it('marks only the current route with aria-current', () => {
    render(<NavLinks />);
    expect(screen.getByRole('link', { name: 'Branches' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Services' })).not.toHaveAttribute('aria-current');
  });
});
