import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getBranchesForService, getServiceBySlug, getServices } from '@/lib/content';
import { ServiceDetail } from './service-detail';

const service = getServiceBySlug('comprehensive-eye-exam')!;
const free = getServiceBySlug('eyewear-adjustment-and-repair')!;
const branches = getBranchesForService(service.slug);
const related = getServices()
  .filter((item) => item.slug !== service.slug)
  .slice(0, 3);

describe('ServiceDetail', () => {
  it('shows the service name as the only h1, with duration and starting price', () => {
    render(<ServiceDetail service={service} branches={branches} related={related} />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(service.name);
    expect(screen.getByText('45 minutes')).toBeInTheDocument();
    expect(screen.getByText('Starts at ₱800')).toBeInTheDocument();
  });

  it('shows the service image with its alt text', () => {
    render(<ServiceDetail service={service} branches={branches} related={related} />);
    const image = screen.getByRole('img', { name: service.image.alt });
    expect(image).toHaveAttribute('src', expect.stringContaining('placeholder'));
  });

  it('omits the price row when the service has no starting price', () => {
    render(
      <ServiceDetail
        service={free}
        branches={getBranchesForService(free.slug)}
        related={related}
      />,
    );
    expect(screen.queryByText(/starts at/i)).not.toBeInTheDocument();
  });

  it('renders each description paragraph separately', () => {
    render(<ServiceDetail service={service} branches={branches} related={related} />);
    for (const paragraph of service.description.split('\n\n')) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
  });

  it('lists the branches offering the service and links to the branches page', () => {
    render(<ServiceDetail service={service} branches={branches} related={related} />);
    const available = screen.getByRole('region', { name: 'Available at' });
    for (const branch of branches) {
      expect(within(available).getByText(branch.name)).toBeInTheDocument();
    }
    expect(within(available).getByRole('link', { name: /branch details/i })).toHaveAttribute(
      'href',
      '/branches',
    );
  });

  it('links to the related services and to contact', () => {
    render(<ServiceDetail service={service} branches={branches} related={related} />);
    for (const item of related) {
      expect(screen.getByRole('link', { name: item.name })).toHaveAttribute(
        'href',
        `/services/${item.slug}`,
      );
    }
    expect(
      screen.getByRole('link', { name: /book this service|ask about this service/i }),
    ).toHaveAttribute('href', '/contact');
  });
});
