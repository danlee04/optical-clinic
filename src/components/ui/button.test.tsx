import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('defaults to the primary variant at a 44px touch height', () => {
    render(<Button>Book</Button>);
    const button = screen.getByRole('button', { name: 'Book' });
    expect(button).toHaveAttribute('data-variant', 'default');
    expect(button).toHaveAttribute('data-size', 'default');
    expect(button.className).toContain('h-11');
  });

  it('keeps every size at least 44px', () => {
    const sizes = ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] as const;
    for (const size of sizes) {
      const { unmount } = render(
        <Button size={size} aria-label={size}>
          x
        </Button>,
      );
      expect(screen.getByRole('button', { name: size }).className).toMatch(
        /\b(h-11|h-12|size-11|size-12)\b/,
      );
      unmount();
    }
  });

  it('renders the accent variant', () => {
    render(<Button variant="accent">Find a branch</Button>);
    expect(screen.getByRole('button', { name: 'Find a branch' })).toHaveAttribute(
      'data-variant',
      'accent',
    );
  });

  it('does not fire onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    screen.getByRole('button', { name: 'Save' }).click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders its child element when asChild is set', () => {
    render(
      <Button asChild>
        <a href="/contact">Contact</a>
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('data-slot', 'button');
  });
});
