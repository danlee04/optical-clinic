import { Container } from '@/components/layout/container';
import { site } from '@/content/site';

export default function Home() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl text-primary sm:text-5xl">{site.name}</h1>
      <p className="mt-4 text-lg text-muted-foreground">Our new website is on the way.</p>
    </Container>
  );
}
