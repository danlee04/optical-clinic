import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './card';

describe('Card', () => {
  it('defaults to the sand variant with the card radius', () => {
    render(<Card>Content</Card>);
    const card = screen.getByText('Content');
    expect(card).toHaveAttribute('data-variant', 'sand');
    expect(card.className).toContain('rounded-card');
  });

  it('renders the teal variant', () => {
    render(<Card variant="teal">Dark</Card>);
    expect(screen.getByText('Dark')).toHaveAttribute('data-variant', 'teal');
  });
});
