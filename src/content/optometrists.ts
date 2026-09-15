import type { ImageAsset, Optometrist } from '@/lib/types';

const portrait = (name: string): ImageAsset => ({
  src: '/images/placeholders/portrait.svg',
  alt: `Portrait of ${name} (placeholder image)`,
  width: 600,
  height: 750,
});

export const optometrists: Optometrist[] = [
  {
    slug: 'maria-santos',
    name: 'Dr. Maria Santos',
    credentials: 'OD',
    bio: 'Dr. Santos leads our Makati clinic and has a special interest in contact lenses for hard-to-fit eyes. Patients like her calm, thorough explanations.',
    photo: portrait('Dr. Maria Santos'),
    branchSlugs: ['makati'],
  },
  {
    slug: 'paolo-reyes',
    name: 'Dr. Paolo Reyes',
    credentials: 'OD',
    bio: 'Dr. Reyes divides his week between Makati and Pasig. He focuses on digital eye strain and helps office workers find comfortable glasses for screen work.',
    photo: portrait('Dr. Paolo Reyes'),
    branchSlugs: ['makati', 'pasig'],
  },
  {
    slug: 'ana-cruz',
    name: 'Dr. Ana Cruz',
    credentials: 'OD',
    bio: 'Dr. Cruz runs our children’s eye care programme in Quezon City. She turns every exam into a game, so young patients leave smiling.',
    photo: portrait('Dr. Ana Cruz'),
    branchSlugs: ['quezon-city'],
  },
  {
    slug: 'jose-mendoza',
    name: 'Dr. Jose Mendoza',
    credentials: 'OD',
    bio: 'Dr. Mendoza has cared for families in Quezon City for over a decade. He is known for patient, detailed comprehensive exams.',
    photo: portrait('Dr. Jose Mendoza'),
    branchSlugs: ['quezon-city'],
  },
  {
    slug: 'carla-villanueva',
    name: 'Dr. Carla Villanueva',
    credentials: 'OD',
    bio: 'Dr. Villanueva heads myopia management at our Pasig clinic and works closely with parents on long-term plans for their children.',
    photo: portrait('Dr. Carla Villanueva'),
    branchSlugs: ['pasig'],
  },
  {
    slug: 'miguel-tan',
    name: 'Dr. Miguel Tan',
    credentials: 'OD',
    bio: 'Dr. Tan sees patients in Pasig and has a keen interest in dry eye. He enjoys helping patients find lasting comfort.',
    photo: portrait('Dr. Miguel Tan'),
    branchSlugs: ['pasig'],
  },
];
