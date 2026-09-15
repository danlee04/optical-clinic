import type { Metadata } from 'next';
import { PageStub } from '@/components/layout/page-stub';

export const metadata: Metadata = { title: 'Contact us' };

export default function Page() {
  return (
    <PageStub
      title="Contact us"
      description="Reach any Clearview branch by phone or email. The contact form is being prepared."
    />
  );
}
