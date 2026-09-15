import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getServices } from '@/lib/content';
import { ServiceGrid } from './service-grid';

describe('ServiceGrid', () => {
  const services = getServices().filter((s) =>
    ['comprehensive-eye-exam', 'eyewear-adjustment-and-repair'].includes(s.slug),
  );

  it('renders a labelled section with a card per service', () => {
    render(<ServiceGrid id="services-heading" title="Our services" services={services} />);
    const section = screen.getByRole('region', { name: 'Our services' });
    const items = within(section).getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(
      within(items[0]).getByRole('heading', { name: 'Comprehensive Eye Exam' }),
    ).toBeInTheDocument();
  });

  it('shows the starting price only when a price exists', () => {
    render(<ServiceGrid id="services-heading" title="Our services" services={services} />);
    expect(screen.getByText('From ₱800')).toBeInTheDocument();
    expect(screen.getAllByText(/^From ₱/)).toHaveLength(1);
  });

  it('links to the services page', () => {
    render(<ServiceGrid id="services-heading" title="Our services" services={services} />);
    expect(screen.getByRole('link', { name: /view all services/i })).toHaveAttribute(
      'href',
      '/services',
    );
  });
});
