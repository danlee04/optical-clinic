import type { Metadata } from 'next';
import { PageStub } from '@/components/layout/page-stub';

export const metadata: Metadata = { title: 'Optometrists' };

export default function Page() {
  return (
    <PageStub
      title="Optometrists"
      description="Meet the licensed optometrists who care for your eyes. Profiles are being prepared."
    />
  );
}
