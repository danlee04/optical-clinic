import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import type { Faq } from '@/lib/types';

export function FaqTeaser({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <section aria-labelledby="faq-heading" className="py-20">
      <Container className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
        <div>
          <SectionHeading
            id="faq-heading"
            eyebrow="Questions"
            title="Before your visit"
            description="Quick answers to what patients ask us most."
          />
          <Button asChild variant="outline" className="mt-8">
            <Link href="/faq">
              See all FAQs
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="min-h-11 text-left text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
