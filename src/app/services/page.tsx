import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { ServiceGrid } from '@/components/sections/service-grid';
import { getServices } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Eye exams, contact lens fittings, eyewear, pediatric care and more at Clearview Optical Clinic.',
};

export default function Page() {
  return (
    <>
      <Container className="pt-16 pb-4">
        <p className="text-sm font-semibold tracking-wide text-teal-soft uppercase">What we do</p>
        <h1 className="mt-2 text-4xl text-primary sm:text-5xl">Services</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Every visit starts with listening. Below is what we offer, how long each appointment
          usually takes, and where prices start.
        </p>
      </Container>
      <ServiceGrid
        id="all-services-heading"
        title="All services"
        services={getServices()}
        footerLink={{ href: '/contact', label: 'Ask us a question' }}
      />
    </>
  );
}
