import type { Metadata } from 'next';
import { PageStub } from '@/components/layout/page-stub';

export const metadata: Metadata = { title: 'FAQ' };

export default function Page() {
  return (
    <PageStub
      title="FAQ"
      description="Answers to common questions about visits, eye exams and eyewear. The full FAQ is being prepared."
    />
  );
}
