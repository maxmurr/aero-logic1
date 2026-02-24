import { describe, expect, it } from 'vitest';
import { getRandomRiddle, Riddle } from '../RiddleService';

const RIDDLE_A: Riddle = {
    id: '1',
    contents: 'What has hands but cannot clap?',
    answers: [{ id: 'ans_1', text: 'A clock' }],
};

const RIDDLE_B: Riddle = {
    id: '2',
    contents: 'What has keys but no locks?',
    answers: [{ id: 'ans_2', text: 'A piano' }],
};

describe('Riddle service', () => {
    describe('retrieve random riddle', () => {
        it('returns a riddle from the collection', () => {
            const result = getRandomRiddle([RIDDLE_A, RIDDLE_B]);

            expect([RIDDLE_A, RIDDLE_B]).toContainEqual(result);
        });

        it('returns undefined for an empty collection', () => {
            const result = getRandomRiddle([]);

            expect(result).toBeUndefined();
        });
    });
});
