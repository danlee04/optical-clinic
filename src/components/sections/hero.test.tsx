import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { site } from '@/content/site';
import { Hero } from './hero';

describe('Hero', () => {
  it('renders the hero title as the h1 with both calls to action', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: site.hero.title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /find a branch/i })).toHaveAttribute(
      'href',
      '/branches',
    );
    expect(screen.getByRole('link', { name: /our services/i })).toHaveAttribute(
      'href',
      '/services',
    );
  });

  it('server-renders visible content so the hero works without JavaScript', () => {
    const html = renderToString(<Hero />);
    expect(html).toContain(site.hero.title);
    expect(html).not.toMatch(/opacity:\s*0/);
  });
});
