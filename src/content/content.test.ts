import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { formatDayHours } from '@/lib/hours';
import { branches } from './branches';
import { faqs } from './faqs';
import { optometrists } from './optometrists';
import { services } from './services';
import { site } from './site';
import { testimonials } from './testimonials';

const PH_E164 = /^\+63\d{9,10}$/;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const DANGEROUS_URL = /^\s*(javascript|data|vbscript):/i;

function allStrings(value: unknown, path = 'content'): { path: string; value: string }[] {
  if (typeof value === 'string') return [{ path, value }];
  if (Array.isArray(value))
    return value.flatMap((item, index) => allStrings(item, `${path}[${index}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => allStrings(item, `${path}.${key}`));
  }
  return [];
}

function duplicates(values: string[]): string[] {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

describe('seed content size', () => {
  it('has 3 branches, 8 services, 6 optometrists, 12 FAQs and 8 testimonials', () => {
    expect(branches).toHaveLength(3);
    expect(services).toHaveLength(8);
    expect(optometrists).toHaveLength(6);
    expect(faqs).toHaveLength(12);
    expect(testimonials).toHaveLength(8);
  });
});

describe('identifiers', () => {
  it('uses unique slugs and ids', () => {
    expect(duplicates(branches.map((b) => b.slug))).toEqual([]);
    expect(duplicates(services.map((s) => s.slug))).toEqual([]);
    expect(duplicates(optometrists.map((o) => o.slug))).toEqual([]);
    expect(duplicates(faqs.map((f) => f.id))).toEqual([]);
    expect(duplicates(testimonials.map((t) => t.id))).toEqual([]);
  });

  it('uses URL-safe slugs', () => {
    const slugs = [...branches, ...services, ...optometrists].map((item) => item.slug);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });
});

describe('relationships', () => {
  const serviceSlugs = new Set(services.map((s) => s.slug));
  const optometristSlugs = new Set(optometrists.map((o) => o.slug));
  const branchSlugs = new Set(branches.map((b) => b.slug));

  it('references only existing services and optometrists from branches', () => {
    for (const branch of branches) {
      expect(branch.serviceSlugs.filter((slug) => !serviceSlugs.has(slug))).toEqual([]);
      expect(branch.optometristSlugs.filter((slug) => !optometristSlugs.has(slug))).toEqual([]);
      expect(branch.optometristSlugs.length).toBeGreaterThan(0);
    }
  });

  it('references only existing branches from optometrists', () => {
    for (const optometrist of optometrists) {
      expect(optometrist.branchSlugs.filter((slug) => !branchSlugs.has(slug))).toEqual([]);
      expect(optometrist.branchSlugs.length).toBeGreaterThan(0);
    }
  });

  it('agrees on both sides of every branch–optometrist link', () => {
    for (const branch of branches) {
      for (const slug of branch.optometristSlugs) {
        const optometrist = optometrists.find((o) => o.slug === slug);
        expect(optometrist?.branchSlugs, `${slug} should list ${branch.slug}`).toContain(
          branch.slug,
        );
      }
    }
    for (const optometrist of optometrists) {
      for (const slug of optometrist.branchSlugs) {
        const branch = branches.find((b) => b.slug === slug);
        expect(branch?.optometristSlugs, `${slug} should list ${optometrist.slug}`).toContain(
          optometrist.slug,
        );
      }
    }
  });

  it('offers every service at one branch or more', () => {
    for (const service of services) {
      expect(
        branches.some((b) => b.serviceSlugs.includes(service.slug)),
        service.slug,
      ).toBe(true);
    }
  });
});

describe('contact details', () => {
  it('uses Philippine E.164 phone numbers', () => {
    for (const branch of branches) {
      expect(branch.phone).toMatch(PH_E164);
      if (branch.viber) expect(branch.viber).toMatch(PH_E164);
    }
  });

  it('uses valid emails on the reserved .example domain', () => {
    for (const branch of branches) {
      expect(branch.email).toMatch(EMAIL);
      expect(branch.email.endsWith('.example')).toBe(true);
    }
  });

  it('only uses https Messenger links', () => {
    for (const branch of branches) {
      if (branch.messengerUrl) expect(branch.messengerUrl.startsWith('https://')).toBe(true);
    }
  });

  it('has valid opening hours', () => {
    for (const branch of branches) {
      for (const dayHours of Object.values(branch.hours)) {
        expect(() => formatDayHours(dayHours)).not.toThrow();
      }
    }
  });

  it('places branches inside Metro Manila', () => {
    for (const { coordinates } of branches) {
      expect(coordinates.lat).toBeGreaterThan(14.3);
      expect(coordinates.lat).toBeLessThan(14.8);
      expect(coordinates.lng).toBeGreaterThan(120.9);
      expect(coordinates.lng).toBeLessThan(121.2);
    }
  });
});

describe('safety', () => {
  it('contains no javascript:, data: or vbscript: URLs anywhere', () => {
    const everything = { site, branches, services, optometrists, faqs, testimonials };
    const offenders = allStrings(everything).filter((entry) => DANGEROUS_URL.test(entry.value));
    expect(offenders).toEqual([]);
  });

  it('contains no HTML markup in text', () => {
    const everything = { site, branches, services, optometrists, faqs, testimonials };
    const offenders = allStrings(everything).filter((entry) => /<[a-z!/]/i.test(entry.value));
    expect(offenders).toEqual([]);
  });
});

describe('images', () => {
  const images = [
    ...branches.flatMap((b) => b.images),
    ...services.map((s) => s.image),
    ...optometrists.map((o) => o.photo),
  ];

  it('points at files that exist in public/', () => {
    for (const image of images) {
      expect(image.src.startsWith('/images/'), image.src).toBe(true);
      expect(existsSync(join(process.cwd(), 'public', image.src)), image.src).toBe(true);
    }
  });

  it('has alt text and dimensions', () => {
    for (const image of images) {
      expect(image.alt.trim().length).toBeGreaterThan(10);
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
    }
  });
});
