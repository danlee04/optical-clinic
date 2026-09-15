import type { Metadata } from 'next';
import { PageStub } from '@/components/layout/page-stub';

export const metadata: Metadata = { title: 'About' };

export default function Page() {
  return (
    <PageStub
      title="About"
      description="Our story and the values behind our care. This page is being prepared."
    />
  );
}
