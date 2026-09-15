import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TrustBar } from './trust-bar';

describe('TrustBar', () => {
  it('pairs each value with its label', () => {
    render(
      <TrustBar
        stats={[
          { value: 3, label: 'Branches' },
          { value: 25000, suffix: '+', label: 'Eye exams performed' },
        ]}
      />,
    );
    expect(screen.getByText('Branches')).toBeInTheDocument();
    expect(screen.getByText('Eye exams performed')).toBeInTheDocument();
    expect(screen.getAllByText('25,000+')).toHaveLength(2);
  });
});
