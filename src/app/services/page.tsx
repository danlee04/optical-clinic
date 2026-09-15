import type { Metadata } from 'next';
import { PageStub } from '@/components/layout/page-stub';

export const metadata: Metadata = { title: 'Services' };

export default function Page() {
  return (
    <PageStub
      title="Services"
      description="Eye exams, contact lens fittings, eyewear and more. The full services page is being prepared."
    />
  );
}
