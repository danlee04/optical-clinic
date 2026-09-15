import { site } from '@/content/site';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-4 px-6">
      <h1 className="text-4xl font-semibold">{site.name}</h1>
      <p>Our new website is on the way.</p>
    </main>
  );
}
