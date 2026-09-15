import { describe, expect, it } from 'vitest';
import {
  getBranchBySlug,
  getBranches,
  getBranchesForService,
  getBranchNamesForOptometrist,
  getFaqsByCategory,
  getFeaturedServices,
  getOptometrists,
  getOptometristsForBranch,
  getServiceBySlug,
  getServices,
  getServicesForBranch,
  getTestimonials,
  getTopFaqs,
} from './content';

describe('branches', () => {
  it('returns all branches', () => {
    expect(getBranches().map((b) => b.slug)).toEqual(['makati', 'quezon-city', 'pasig']);
  });

  it('finds a branch by slug and returns undefined for unknown slugs', () => {
    expect(getBranchBySlug('pasig')?.name).toBe('Clearview Pasig');
    expect(getBranchBySlug('cebu')).toBeUndefined();
  });

  it('lists the branches that offer a service', () => {
    expect(getBranchesForService('pediatric-eye-care').map((b) => b.slug)).toEqual([
      'quezon-city',
      'pasig',
    ]);
    expect(getBranchesForService('unknown')).toEqual([]);
  });
});

describe('services', () => {
  it('returns all services and finds one by slug', () => {
    expect(getServices()).toHaveLength(8);
    expect(getServiceBySlug('comprehensive-eye-exam')?.durationMinutes).toBe(45);
    expect(getServiceBySlug('laser-surgery')).toBeUndefined();
  });

  it('returns the first services in content order as featured', () => {
    expect(getFeaturedServices().map((s) => s.slug)).toEqual(
      getServices()
        .slice(0, 6)
        .map((s) => s.slug),
    );
    expect(getFeaturedServices(3)).toHaveLength(3);
  });

  it("lists a branch's services in the branch's order", () => {
    const makati = getServicesForBranch('makati').map((s) => s.slug);
    expect(makati).not.toContain('pediatric-eye-care');
    expect(makati).toEqual(getBranchBySlug('makati')?.serviceSlugs);
    expect(getServicesForBranch('unknown')).toEqual([]);
  });
});

describe('optometrists', () => {
  it("lists a branch's optometrists", () => {
    expect(getOptometrists()).toHaveLength(6);
    expect(getOptometristsForBranch('pasig').map((o) => o.slug)).toEqual([
      'paolo-reyes',
      'carla-villanueva',
      'miguel-tan',
    ]);
    expect(getOptometristsForBranch('unknown')).toEqual([]);
  });

  it('names the branches an optometrist works at', () => {
    const paolo = getOptometrists().find((o) => o.slug === 'paolo-reyes');
    expect(paolo && getBranchNamesForOptometrist(paolo)).toEqual([
      'Clearview Makati',
      'Clearview Pasig',
    ]);
  });
});

describe('faqs and testimonials', () => {
  it('groups FAQs by category in first-appearance order without losing any', () => {
    const groups = getFaqsByCategory();
    expect(groups.map((g) => g.category)).toEqual(['Visits', 'Eye exams', 'Eyewear', 'Payments']);
    expect(groups.reduce((total, g) => total + g.faqs.length, 0)).toBe(12);
  });

  it('returns the top FAQs', () => {
    expect(getTopFaqs().map((f) => f.id)).toEqual([
      'walk-ins',
      'exam-length',
      'exam-frequency',
      'bring-to-visit',
    ]);
    expect(getTopFaqs(2)).toHaveLength(2);
  });

  it('returns all testimonials', () => {
    expect(getTestimonials()).toHaveLength(8);
  });
});
