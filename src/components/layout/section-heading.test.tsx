import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHeading } from './section-heading';

describe('SectionHeading', () => {
  it('renders an h2 with the given id, eyebrow and description', () => {
    render(
      <SectionHeading
        id="services-heading"
        eyebrow="What we do"
        title="Our services"
        description="Care for every age."
      />,
    );
    const heading = screen.getByRole('heading', { level: 2, name: 'Our services' });
    expect(heading).toHaveAttribute('id', 'services-heading');
    expect(screen.getByText('What we do')).toBeInTheDocument();
    expect(screen.getByText('Care for every age.')).toBeInTheDocument();
  });

  it('omits the eyebrow and description when not given', () => {
    const { container } = render(<SectionHeading title="Plain" />);
    expect(container.querySelectorAll('p')).toHaveLength(0);
  });
});
