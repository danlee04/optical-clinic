import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { services } from '@/content/services';
import { site } from '@/content/site';
import { Icon, ICONS } from './icon';

describe('Icon', () => {
  it('has an icon for every service and feature in the content', () => {
    const names = [...services.map((s) => s.icon), ...site.whyChooseUs.map((f) => f.icon)];
    expect(names.filter((name) => !(name in ICONS))).toEqual([]);
  });

  it('renders a decorative svg, falling back for unknown names', () => {
    const { container } = render(
      <>
        <Icon name="Eye" />
        <Icon name="DoesNotExist" />
      </>,
    );
    const svgs = container.querySelectorAll('svg');
    expect(svgs).toHaveLength(2);
    svgs.forEach((svg) => expect(svg).toHaveAttribute('aria-hidden', 'true'));
  });
});
