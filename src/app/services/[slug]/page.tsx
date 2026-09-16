import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetail } from '@/components/services/service-detail';
import { getBranchesForService, getServiceBySlug, getServices } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service not found' };
  return { title: service.name, description: service.shortDescription };
}

export default async function Page(props: PageProps<'/services/[slug]'>) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getServices()
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <ServiceDetail
      service={service}
      branches={getBranchesForService(service.slug)}
      related={related}
    />
  );
}
