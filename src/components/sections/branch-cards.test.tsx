import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getBranches } from '@/lib/content';
import { BranchCards } from './branch-cards';

describe('BranchCards', () => {
  const branches = getBranches();

  it('renders a card per branch with name and city', () => {
    render(<BranchCards id="branches-heading" title="Our branches" branches={branches} />);
    const section = screen.getByRole('region', { name: 'Our branches' });
    expect(within(section).getAllByRole('listitem')).toHaveLength(3);
    expect(within(section).getByRole('heading', { name: 'Clearview Makati' })).toBeInTheDocument();
  });

  it('links Call and Directions for each branch with descriptive labels', () => {
    render(<BranchCards id="branches-heading" title="Our branches" branches={branches} />);
    expect(screen.getByRole('link', { name: 'Call Clearview Pasig' })).toHaveAttribute(
      'href',
      'tel:+63280001003',
    );
    const directions = screen.getByRole('link', {
      name: 'Directions to Clearview Pasig (opens in a new tab)',
    });
    expect(directions).toHaveAttribute(
      'href',
      'https://www.google.com/maps/dir/?api=1&destination=14.5866,121.0614',
    );
    expect(directions).toHaveAttribute('target', '_blank');
    expect(directions).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
