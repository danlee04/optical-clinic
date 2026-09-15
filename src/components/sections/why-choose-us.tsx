import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { site } from '@/content/site';

// Column spans for five cards on a 3-column grid: 2+1 / 1+2 / 3.
const SPANS = ['md:col-span-2', '', '', 'md:col-span-2', 'md:col-span-3'];

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="bg-sand/40 py-20">
      <Container>
        <SectionHeading
          id="why-heading"
          eyebrow="Why Clearview"
          title="Eye care that feels personal"
          description="A clinic built around the patient in the chair, not the frames on the wall."
        />
        <BentoGrid className="mt-10">
          {site.whyChooseUs.map((feature, index) => (
            <BentoCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className={SPANS[index]}
            />
          ))}
        </BentoGrid>
      </Container>
    </section>
  );
}
