import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getBranchNamesForOptometrist, getBranches, getOptometrists } from '@/lib/content';
import { OptometristDirectory } from './optometrist-directory';

const people = getOptometrists().map((optometrist) => ({
  optometrist,
  branchNames: getBranchNamesForOptometrist(optometrist),
}));
const branches = getBranches().map((branch) => ({ slug: branch.slug, name: branch.name }));

function renderDirectory() {
  render(<OptometristDirectory people={people} branches={branches} />);
}

describe('OptometristDirectory', () => {
  it('shows every optometrist by default, with "All branches" pressed', () => {
    renderDirectory();
    expect(screen.getByRole('button', { name: 'All branches' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
  });

  it('filters to the optometrists of the chosen branch', () => {
    renderDirectory();
    fireEvent.click(screen.getByRole('button', { name: 'Clearview Quezon City' }));

    expect(screen.getByRole('button', { name: 'Clearview Quezon City' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'All branches' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Dr. Ana Cruz, OD')).toBeInTheDocument();
    expect(screen.queryByText('Dr. Maria Santos, OD')).not.toBeInTheDocument();
  });

  it('announces how many optometrists are shown', () => {
    renderDirectory();
    expect(screen.getByRole('status')).toHaveTextContent('Showing 6 optometrists');

    fireEvent.click(screen.getByRole('button', { name: 'Clearview Makati' }));
    expect(screen.getByRole('status')).toHaveTextContent(
      'Showing 2 optometrists at Clearview Makati',
    );
  });

  it('returns to the full list when All branches is chosen again', () => {
    renderDirectory();
    fireEvent.click(screen.getByRole('button', { name: 'Clearview Makati' }));
    fireEvent.click(screen.getByRole('button', { name: 'All branches' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
  });
});
