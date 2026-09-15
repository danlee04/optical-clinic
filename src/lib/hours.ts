import type { DayHours, DayKey, WeeklyHours } from './types';

export const DAY_KEYS: readonly DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const DAY_LABELS: Record<DayKey, string> = {
  sun: 'Sunday',
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
};

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

const manilaFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Manila',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

function toMinutes(hhmm: string): number {
  const match = TIME_PATTERN.exec(hhmm);
  if (!match) throw new Error(`Invalid time "${hhmm}"`);
  return Number(match[1]) * 60 + Number(match[2]);
}

export function getManilaNow(date: Date): { day: DayKey; minutes: number } {
  const parts = manilaFormatter.formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((entry) => entry.type === type)?.value ?? '';
  const day = part('weekday').slice(0, 3).toLowerCase() as DayKey;
  const minutes = Number(part('hour')) * 60 + Number(part('minute'));
  return { day, minutes };
}

export function getTodayKey(date: Date): DayKey {
  return getManilaNow(date).day;
}

export function isOpenAt(hours: WeeklyHours, date: Date): boolean {
  const { day, minutes } = getManilaNow(date);

  const today = hours[day];
  if (today) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    const spansMidnight = close <= open;
    if (spansMidnight ? minutes >= open : minutes >= open && minutes < close) return true;
  }

  const previousDay = DAY_KEYS[(DAY_KEYS.indexOf(day) + 6) % 7];
  const previous = hours[previousDay];
  if (previous) {
    const open = toMinutes(previous.open);
    const close = toMinutes(previous.close);
    if (close <= open && minutes < close) return true;
  }

  return false;
}

export function formatTime(hhmm: string): string {
  const total = toMinutes(hhmm);
  const hours24 = Math.floor(total / 60);
  const minutes = String(total % 60).padStart(2, '0');
  const suffix = hours24 < 12 ? 'AM' : 'PM';
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${minutes} ${suffix}`;
}

export function formatDayHours(dayHours: DayHours): string {
  if (!dayHours) return 'Closed';
  return `${formatTime(dayHours.open)} – ${formatTime(dayHours.close)}`;
}
