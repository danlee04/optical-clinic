import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { site } from '@/content/site';
import Home from './page';

describe('Home placeholder', () => {
  it('shows the brand name as the only h1', () => {
    render(<Home />);

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(site.name);
  });

  it('renders inside a main landmark', () => {
    render(<Home />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
