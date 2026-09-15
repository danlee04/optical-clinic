import type { Metadata } from 'next';
import { PageStub } from '@/components/layout/page-stub';

export const metadata: Metadata = { title: 'Branches' };

export default function Page() {
  return (
    <PageStub
      title="Branches"
      description="Find our clinics in Makati, Quezon City and Pasig. Branch details are being prepared."
    />
  );
}
