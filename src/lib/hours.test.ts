import { afterEach, describe, expect, it } from 'vitest';
import { DAY_KEYS, formatDayHours, formatTime, getManilaNow, getTodayKey, isOpenAt } from './hours';
import type { WeeklyHours } from './types';

const weekdayHours: WeeklyHours = {
  sun: null,
  mon: { open: '09:00', close: '18:00' },
  tue: { open: '09:00', close: '18:00' },
  wed: { open: '09:00', close: '18:00' },
  thu: { open: '09:00', close: '18:00' },
  fri: { open: '09:00', close: '18:00' },
  sat: { open: '10:00', close: '16:00' },
};

const lateFridayHours: WeeklyHours = {
  sun: null,
  mon: null,
  tue: null,
  wed: null,
  thu: null,
  fri: { open: '20:00', close: '02:00' },
  sat: null,
};

describe('getManilaNow', () => {
  it('converts a UTC instant to the Manila weekday and minutes since midnight', () => {
    // 2026-09-14 02:30 UTC = Monday 10:30 in Manila
    expect(getManilaNow(new Date('2026-09-14T02:30:00Z'))).toEqual({ day: 'mon', minutes: 630 });
  });
});

describe('getTodayKey', () => {
  it('uses the Manila date even when UTC is still the previous day', () => {
    // Sunday 16:30 UTC = Monday 00:30 in Manila
    expect(getTodayKey(new Date('2026-09-13T16:30:00Z'))).toBe('mon');
  });
});

describe('isOpenAt', () => {
  it('is open during opening hours', () => {
    expect(isOpenAt(weekdayHours, new Date('2026-09-14T02:00:00Z'))).toBe(true); // Mon 10:00
  });

  it('is closed before opening', () => {
    expect(isOpenAt(weekdayHours, new Date('2026-09-14T00:59:00Z'))).toBe(false); // Mon 08:59
  });

  it('is open exactly at opening time', () => {
    expect(isOpenAt(weekdayHours, new Date('2026-09-14T01:00:00Z'))).toBe(true); // Mon 09:00
  });

  it('is closed exactly at closing time', () => {
    expect(isOpenAt(weekdayHours, new Date('2026-09-14T10:00:00Z'))).toBe(false); // Mon 18:00
  });

  it('is closed all day on a closed day', () => {
    expect(isOpenAt(weekdayHours, new Date('2026-09-13T04:00:00Z'))).toBe(false); // Sun 12:00
  });

  it('stays open past midnight when hours span midnight', () => {
    expect(isOpenAt(lateFridayHours, new Date('2026-09-18T15:00:00Z'))).toBe(true); // Fri 23:00
    expect(isOpenAt(lateFridayHours, new Date('2026-09-18T17:30:00Z'))).toBe(true); // Sat 01:30
  });

  it('closes at the closing time after midnight', () => {
    expect(isOpenAt(lateFridayHours, new Date('2026-09-18T18:00:00Z'))).toBe(false); // Sat 02:00
    expect(isOpenAt(lateFridayHours, new Date('2026-09-18T11:59:00Z'))).toBe(false); // Fri 19:59
  });

  describe('regardless of the machine timezone', () => {
    const originalTz = process.env.TZ;
    afterEach(() => {
      process.env.TZ = originalTz;
    });

    it('gives the same answer when the process runs in Los Angeles time', () => {
      process.env.TZ = 'America/Los_Angeles';
      expect(isOpenAt(weekdayHours, new Date('2026-09-14T02:00:00Z'))).toBe(true); // Mon 10:00 Manila
      expect(isOpenAt(weekdayHours, new Date('2026-09-13T04:00:00Z'))).toBe(false); // Sun 12:00 Manila
    });
  });
});

describe('formatting', () => {
  it('formats 24-hour times as 12-hour clock times', () => {
    expect(formatTime('09:00')).toBe('9:00 AM');
    expect(formatTime('12:30')).toBe('12:30 PM');
    expect(formatTime('00:15')).toBe('12:15 AM');
    expect(formatTime('18:00')).toBe('6:00 PM');
  });

  it('rejects malformed times', () => {
    expect(() => formatTime('25:00')).toThrow('Invalid time "25:00"');
    expect(() => formatTime('9:00')).toThrow('Invalid time "9:00"');
  });

  it('formats a day range or Closed', () => {
    expect(formatDayHours({ open: '09:00', close: '18:00' })).toBe('9:00 AM – 6:00 PM');
    expect(formatDayHours(null)).toBe('Closed');
  });

  it('lists days from Sunday to Saturday', () => {
    expect(DAY_KEYS).toEqual(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
  });
});
