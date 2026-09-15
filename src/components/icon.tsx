import {
  Baby,
  BadgeCheck,
  CircleDot,
  Clock,
  Eye,
  Focus,
  Glasses,
  HeartHandshake,
  Microscope,
  Monitor,
  ScanEye,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

// Whitelist instead of importing every Lucide icon, so content strings cannot bloat the bundle.
export const ICONS = {
  Baby,
  BadgeCheck,
  Clock,
  Eye,
  Focus,
  Glasses,
  HeartHandshake,
  Microscope,
  Monitor,
  ScanEye,
  ShieldCheck,
  Wrench,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Component = ICONS[name as keyof typeof ICONS] ?? CircleDot;
  return <Component aria-hidden="true" className={className} />;
}
