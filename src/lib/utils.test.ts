import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('lets the later Tailwind class win when two conflict', () => {
    expect(cn('px-2 text-sm', 'px-4')).toBe('text-sm px-4');
  });

  it('drops falsy values', () => {
    const isActive = false;
    expect(cn('rounded', isActive && 'ring-2', undefined, null, 'shadow')).toBe('rounded shadow');
  });
});
