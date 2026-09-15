import { branches } from '@/content/branches';
import { faqs } from '@/content/faqs';
import { optometrists } from '@/content/optometrists';
import { services } from '@/content/services';
import { testimonials } from '@/content/testimonials';
import type { Branch, Faq, Optometrist, Service, Testimonial } from './types';

function bySlugs<T extends { slug: string }>(items: T[], slugs: readonly string[]): T[] {
  return slugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is T => item !== undefined);
}

export function getBranches(): Branch[] {
  return branches;
}

export function getBranchBySlug(slug: string): Branch | undefined {
  return branches.find((branch) => branch.slug === slug);
}

export function getServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getFeaturedServices(limit = 6): Service[] {
  return services.slice(0, limit);
}

export function getServicesForBranch(branchSlug: string): Service[] {
  const branch = getBranchBySlug(branchSlug);
  return branch ? bySlugs(services, branch.serviceSlugs) : [];
}

export function getBranchesForService(serviceSlug: string): Branch[] {
  return branches.filter((branch) => branch.serviceSlugs.includes(serviceSlug));
}

export function getOptometrists(): Optometrist[] {
  return optometrists;
}

export function getOptometristsForBranch(branchSlug: string): Optometrist[] {
  const branch = getBranchBySlug(branchSlug);
  return branch ? bySlugs(optometrists, branch.optometristSlugs) : [];
}

export function getBranchNamesForOptometrist(optometrist: Optometrist): string[] {
  return bySlugs(branches, optometrist.branchSlugs).map((branch) => branch.name);
}

export function getFaqsByCategory(): { category: string; faqs: Faq[] }[] {
  const groups = new Map<string, Faq[]>();
  for (const faq of faqs) {
    groups.set(faq.category, [...(groups.get(faq.category) ?? []), faq]);
  }
  return [...groups].map(([category, items]) => ({ category, faqs: items }));
}

export function getTopFaqs(limit = 4): Faq[] {
  return faqs.slice(0, limit);
}

export function getTestimonials(): Testimonial[] {
  return testimonials;
}
