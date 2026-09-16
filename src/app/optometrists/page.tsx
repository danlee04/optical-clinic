import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { OptometristDirectory } from '@/components/optometrists/optometrist-directory';
import { getBranchNamesForOptometrist, getBranches, getOptometrists } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Optometrists',
  description:
    'Meet the licensed Doctors of Optometry who care for patients at Clearview Optical Clinic in Makati, Quezon City and Pasig.',
};

export default function Page() {
  const people = getOptometrists().map((optometrist) => ({
    optometrist,
    branchNames: getBranchNamesForOptometrist(optometrist),
  }));
  const branches = getBranches().map((branch) => ({ slug: branch.slug, name: branch.name }));

  return (
    <Container className="py-16">
      <p className="text-sm font-semibold tracking-wide text-teal-soft uppercase">Our team</p>
      <h1 className="mt-2 text-4xl text-primary sm:text-5xl">Optometrists</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Every exam at Clearview is done by a licensed Doctor of Optometry. Filter by branch to see
        who you will meet.
      </p>
      <div className="mt-10">
        <OptometristDirectory people={people} branches={branches} />
      </div>
    </Container>
  );
}
