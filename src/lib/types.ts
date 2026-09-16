export type DayKey = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

/** "HH:mm" 24-hour strings; null = closed that day. A close earlier than open spans midnight. */
export type DayHours = { open: string; close: string } | null;

export type WeeklyHours = Record<DayKey, DayHours>;

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Branch {
  slug: string;
  name: string;
  address: string;
  city: string;
  /** E.164, e.g. "+63280001001" */
  phone: string;
  email: string;
  /** "https://m.me/<page>" */
  messengerUrl?: string;
  /** E.164 */
  viber?: string;
  coordinates: { lat: number; lng: number };
  hours: WeeklyHours;
  serviceSlugs: readonly string[];
  optometristSlugs: readonly string[];
  images: readonly ImageAsset[];
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  /** Plain paragraphs separated by a blank line; no HTML. */
  description: string;
  durationMinutes: number;
  /** PHP */
  priceFrom?: number;
  /** Key of the icon map in `src/components/icon.tsx` */
  icon: string;
  image: ImageAsset;
}

export interface Optometrist {
  slug: string;
  name: string;
  credentials: string;
  prcLicenseNo?: string;
  bio: string;
  photo: ImageAsset;
  branchSlugs: readonly string[];
}

export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  author: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
}
