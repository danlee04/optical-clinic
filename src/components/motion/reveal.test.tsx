import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Reveal } from './reveal';

describe('Reveal', () => {
  it('renders its children visibly in server HTML, with no inline hiding styles', () => {
    const html = renderToString(
      <Reveal className="extra">
        <p>Hello</p>
      </Reveal>,
    );
    expect(html).toContain('<p>Hello</p>');
    expect(html).toContain('reveal');
    expect(html).toContain('extra');
    expect(html).not.toMatch(/style=/);
  });
});
