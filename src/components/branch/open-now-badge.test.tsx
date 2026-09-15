import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { WeeklyHours } from '@/lib/types';
import { OpenNowBadge } from './open-now-badge';

const hours: WeeklyHours = {
  sun: null,
  mon: { open: '09:00', close: '18:00' },
  tue: { open: '09:00', close: '18:00' },
  wed: { open: '09:00', close: '18:00' },
  thu: { open: '09:00', close: '18:00' },
  fri: { open: '09:00', close: '18:00' },
  sat: null,
};

describe('OpenNowBadge', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders a neutral label on the server so build-time HTML never claims open or closed', () => {
    vi.setSystemTime(new Date('2026-09-14T02:00:00Z')); // Mon 10:00 Manila
    const html = renderToString(<OpenNowBadge hours={hours} />);
    expect(html).toContain('See opening hours');
    expect(html).not.toContain('Open now');
  });

  it('shows Open now during opening hours', () => {
    vi.setSystemTime(new Date('2026-09-14T02:00:00Z')); // Mon 10:00 Manila
    render(<OpenNowBadge hours={hours} />);
    expect(screen.getByText('Open now')).toBeInTheDocument();
  });

  it('shows Closed now outside opening hours', () => {
    vi.setSystemTime(new Date('2026-09-13T04:00:00Z')); // Sun 12:00 Manila
    render(<OpenNowBadge hours={hours} />);
    expect(screen.getByText('Closed now')).toBeInTheDocument();
  });
});
