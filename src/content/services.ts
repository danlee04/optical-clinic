import type { ImageAsset, Service } from '@/lib/types';

const serviceImage = (name: string): ImageAsset => ({
  src: '/images/placeholders/service.svg',
  alt: `Illustration for ${name} (placeholder image)`,
  width: 1200,
  height: 800,
});

export const services: Service[] = [
  {
    slug: 'comprehensive-eye-exam',
    name: 'Comprehensive Eye Exam',
    shortDescription: 'A full check of your vision and eye health, explained in plain language.',
    description:
      'Our optometrists measure how clearly you see at every distance, check how your eyes work together, and look at the health of the front and back of the eye.\n\nYou leave with an updated prescription if you need one and a clear explanation of what we found.',
    durationMinutes: 45,
    priceFrom: 800,
    icon: 'Eye',
    image: serviceImage('Comprehensive Eye Exam'),
  },
  {
    slug: 'eyeglasses-and-lenses',
    name: 'Eyeglasses & Lens Fitting',
    shortDescription:
      'Frames chosen for your face and lenses matched to your prescription and daily life.',
    description:
      'We help you pick frames that fit comfortably and suit your style, then take precise measurements so your lenses sit exactly where your eyes need them.\n\nAsk about anti-reflective, blue-light filtering and progressive lens options.',
    durationMinutes: 30,
    priceFrom: 2500,
    icon: 'Glasses',
    image: serviceImage('Eyeglasses and Lens Fitting'),
  },
  {
    slug: 'contact-lens-fitting',
    name: 'Contact Lens Fitting',
    shortDescription: 'Lenses fitted to the shape of your eyes, with a trial pair and care lesson.',
    description:
      'Contact lenses need their own measurements. We check the curve of your cornea and your tear film, then fit trial lenses and see how your eyes respond.\n\nFirst-time wearers get a hands-on lesson in putting in, removing and caring for lenses.',
    durationMinutes: 40,
    priceFrom: 1200,
    icon: 'Focus',
    image: serviceImage('Contact Lens Fitting'),
  },
  {
    slug: 'pediatric-eye-care',
    name: 'Pediatric Eye Care',
    shortDescription: 'Gentle, playful eye checks for children from preschool age.',
    description:
      'Children rarely say they cannot see the board. Our pediatric exams use games and picture charts to check vision, focusing and eye coordination.\n\nWe recommend a first exam before your child starts school.',
    durationMinutes: 40,
    priceFrom: 900,
    icon: 'Baby',
    image: serviceImage('Pediatric Eye Care'),
  },
  {
    slug: 'myopia-management',
    name: 'Myopia Management',
    shortDescription: 'A long-term plan to help slow worsening nearsightedness in children.',
    description:
      'For children whose nearsightedness is increasing, we discuss management options such as specialised spectacle lenses and daily habits, and track progress at regular visits.\n\nEvery plan starts with a detailed assessment.',
    durationMinutes: 60,
    priceFrom: 1500,
    icon: 'ScanEye',
    image: serviceImage('Myopia Management'),
  },
  {
    slug: 'dry-eye-assessment',
    name: 'Dry Eye Assessment',
    shortDescription: 'Find out why your eyes feel gritty, tired or watery, and what can help.',
    description:
      'Air-conditioning and long screen hours are hard on the eyes. We examine your tear film and eyelids to understand what is causing your discomfort.\n\nYou get practical advice and, where needed, a referral for further care.',
    durationMinutes: 45,
    priceFrom: 1000,
    icon: 'Microscope',
    image: serviceImage('Dry Eye Assessment'),
  },
  {
    slug: 'digital-eye-strain',
    name: 'Digital Eye Strain Consult',
    shortDescription: 'Relief for headaches and tired eyes after long hours on screens.',
    description:
      'If your eyes ache after work, we check your focusing at screen distance and look at how you use your devices.\n\nWe may suggest computer glasses, lens coatings or simple changes to your workspace.',
    durationMinutes: 30,
    priceFrom: 700,
    icon: 'Monitor',
    image: serviceImage('Digital Eye Strain Consult'),
  },
  {
    slug: 'eyewear-adjustment-and-repair',
    name: 'Eyewear Adjustment & Repair',
    shortDescription: 'Loose hinges, slipping frames and nose pads fixed while you wait.',
    description:
      'Bring in any pair of glasses, even ones you did not buy from us. We tighten screws, replace nose pads and adjust frames so they sit comfortably again.\n\nMost adjustments are free and take a few minutes.',
    durationMinutes: 15,
    icon: 'Wrench',
    image: serviceImage('Eyewear Adjustment and Repair'),
  },
];
