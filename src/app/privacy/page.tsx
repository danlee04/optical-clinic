import type { Metadata } from 'next';
import { PageStub } from '@/components/layout/page-stub';

export const metadata: Metadata = { title: 'Privacy notice' };

export default function Page() {
  return (
    <PageStub
      title="Privacy notice"
      description="How we handle personal information under the Data Privacy Act of 2012. The full notice is being prepared."
    />
  );
}
