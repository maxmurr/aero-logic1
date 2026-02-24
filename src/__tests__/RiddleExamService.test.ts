import { describe, expect, it } from 'vitest';
import { evaluateAnswer } from '../RiddleExamService';

describe('RiddleExamService', () => {
    it('returns correct verdict when selected answer matches', () => {
        const result = evaluateAnswer('2', '2');

        expect(result).toEqual({
            isCorrect: true,
            message: 'Great job! Your answer is correct',
        });
    });

    it('returns wrong verdict when selected answer does not match', () => {
        const result = evaluateAnswer('1', '2');

        expect(result).toEqual({
            isCorrect: false,
            message: 'Your answer is wrong',
        });
    });
});
