import { Reveal } from '@/components/motion/reveal';
import { BranchCards } from '@/components/sections/branch-cards';
import { CtaBand } from '@/components/sections/cta-band';
import { FaqTeaser } from '@/components/sections/faq-teaser';
import { Hero } from '@/components/sections/hero';
import { OptometristCarousel } from '@/components/sections/optometrist-carousel';
import { ServiceGrid } from '@/components/sections/service-grid';
import { Testimonials } from '@/components/sections/testimonials';
import { TrustBar } from '@/components/sections/trust-bar';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { site } from '@/content/site';
import {
  getBranches,
  getBranchNamesForOptometrist,
  getFeaturedServices,
  getOptometrists,
  getTestimonials,
  getTopFaqs,
} from '@/lib/content';

export default function Home() {
  const branches = getBranches();
  const optometrists = getOptometrists();

  const stats = [
    { value: branches.length, label: 'Branches in Metro Manila' },
    { value: site.stats.yearsOfCare, suffix: '+', label: 'Years of eye care' },
    { value: site.stats.examsPerformed, suffix: '+', label: 'Eye exams performed' },
    { value: optometrists.length, label: 'Licensed optometrists' },
  ];

  const people = optometrists.map((optometrist) => ({
    optometrist,
    branchNames: getBranchNamesForOptometrist(optometrist),
  }));

  return (
    <>
      <Hero />
      <TrustBar stats={stats} />
      <Reveal>
        <ServiceGrid
          id="services-heading"
          eyebrow="What we do"
          title="Services for every stage of life"
          description="From a child’s first eye check to glasses for long days at the screen."
          services={getFeaturedServices()}
          footerLink={{ href: '/services', label: 'View all services' }}
        />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <BranchCards
          id="branches-heading"
          eyebrow="Visit us"
          title="Find a clinic near you"
          description="Three branches across Metro Manila, open seven days a week between them."
          branches={branches}
          footerLink={{ href: '/branches', label: 'See all branches' }}
        />
      </Reveal>
      <Reveal>
        <OptometristCarousel people={people} />
      </Reveal>
      <Testimonials testimonials={getTestimonials()} />
      <Reveal>
        <FaqTeaser faqs={getTopFaqs()} />
      </Reveal>
      <CtaBand />
    </>
  );
}
