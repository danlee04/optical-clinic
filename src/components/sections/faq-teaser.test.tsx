import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getTopFaqs } from '@/lib/content';
import { FaqTeaser } from './faq-teaser';

describe('FaqTeaser', () => {
  const faqs = getTopFaqs();

  it('lists each question as a collapsed accordion trigger', () => {
    render(<FaqTeaser faqs={faqs} />);
    for (const faq of faqs) {
      expect(screen.getByRole('button', { name: faq.question })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    }
  });

  it('reveals the answer when a question is opened', () => {
    render(<FaqTeaser faqs={faqs} />);
    fireEvent.click(screen.getByRole('button', { name: faqs[0].question }));
    expect(screen.getByRole('button', { name: faqs[0].question })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByText(faqs[0].answer)).toBeVisible();
  });

  it('links to the full FAQ page', () => {
    render(<FaqTeaser faqs={faqs} />);
    expect(screen.getByRole('link', { name: /see all faqs/i })).toHaveAttribute('href', '/faq');
  });
});
