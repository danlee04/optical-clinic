import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { site } from '@/content/site';
import Home from './page';

describe('Home page', () => {
  it('has a single h1: the hero title', () => {
    render(<Home />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(site.hero.title);
  });

  it('renders every section in order', () => {
    render(<Home />);
    const h2s = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
    expect(h2s).toEqual([
      'Services for every stage of life',
      'Eye care that feels personal',
      'Find a clinic near you',
      'Meet our optometrists',
      'What our patients say',
      'Before your visit',
      'Ready for clearer vision?',
    ]);
  });

  it('shows the clinic stats', () => {
    render(<Home />);
    expect(screen.getByRole('region', { name: 'Clearview at a glance' })).toBeInTheDocument();
    expect(screen.getAllByText('25,000+')).toHaveLength(2);
  });
});
