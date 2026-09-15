export const site = {
  name: 'Clearview Optical Clinic',
  shortName: 'Clearview',
  description:
    'Eye exams, contact lenses and eyewear at Clearview Optical Clinic branches in Metro Manila.',
  tagline: 'Clear sight, warmly cared for.',
  nav: [
    { href: '/services', label: 'Services' },
    { href: '/branches', label: 'Branches' },
    { href: '/optometrists', label: 'Optometrists' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
  ],
  cta: { href: '/contact', label: 'Contact us' },
  footerNote: 'Clearview Optical Clinic is a fictional clinic created for a portfolio project.',
  hero: {
    eyebrow: 'Eye care in Metro Manila',
    title: 'See the world clearly, cared for warmly.',
    description:
      'Thorough eye exams, eyewear that fits your life, and optometrists who take the time to explain. Visit us in Makati, Quezon City or Pasig.',
  },
  stats: {
    yearsOfCare: 12,
    examsPerformed: 25000,
  },
  whyChooseUs: [
    {
      icon: 'BadgeCheck',
      title: 'Licensed optometrists',
      description: 'Every exam is done by a licensed Doctor of Optometry, not a sales assistant.',
    },
    {
      icon: 'HeartHandshake',
      title: 'Care that explains',
      description: 'We show you what we see and explain your options in plain language.',
    },
    {
      icon: 'Clock',
      title: 'Open seven days',
      description: 'Evening and weekend hours across our branches fit around work and school.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Honest pricing',
      description: 'Prices are shown up front, and adjustments to any glasses are free.',
    },
    {
      icon: 'Glasses',
      title: 'Frames for every budget',
      description: 'From everyday value frames to premium brands, fitted to your face.',
    },
  ],
} as const;
