import { describe, expect, it } from 'vitest';
import { getWorkInterval } from '../WorkIntervalService';

function dateAtHour(hour: number): Date {
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    return date;
}

describe('Work interval service', () => {
    it('return interval when airport is busy', () => {
        const result = getWorkInterval(dateAtHour(7));

        expect(result).toBe('Busy times');
    });
    it('return interval when airport has regular traffic', () => {
        const result = getWorkInterval(dateAtHour(13));

        expect(result).toBe('Easy jets');
    });
    it('return interval when airport has returning passengers', () => {
        const result = getWorkInterval(dateAtHour(19));

        expect(result).toBe('Returning pips');
    });
    it('return interval when airport is in sleepy hours', () => {
        const result = getWorkInterval(dateAtHour(2));

        expect(result).toBe('Sleepies');
    });

    it('returns Busy times at boundary hour 5', () => {
        expect(getWorkInterval(dateAtHour(5))).toBe('Busy times');
    });

    it('returns Easy jets at boundary hour 11', () => {
        expect(getWorkInterval(dateAtHour(11))).toBe('Easy jets');
    });

    it('returns Returning pips at boundary hour 17', () => {
        expect(getWorkInterval(dateAtHour(17))).toBe('Returning pips');
    });

    it('returns Sleepies at boundary hour 23', () => {
        expect(getWorkInterval(dateAtHour(23))).toBe('Sleepies');
    });

    it('returns Sleepies at midnight', () => {
        expect(getWorkInterval(dateAtHour(0))).toBe('Sleepies');
    });
});
