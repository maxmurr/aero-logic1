import { describe, it, expect, vi } from 'vitest';

vi.mock('riddle-exam', () => ({
    getAnswerFor: vi.fn(),
}));

import { getAnswerFor } from 'riddle-exam';
import { fetchCorrectAnswer } from '../RiddleExamAdapter';

describe('RiddleExamAdapter', () => {
    it('returns the correct answer from the SDK', async () => {
        vi.mocked(getAnswerFor).mockResolvedValue({ id: '2', text: 'An obstacle/tower' });

        const result = await fetchCorrectAnswer('1');

        expect(getAnswerFor).toHaveBeenCalledWith('1');
        expect(result).toEqual({ id: '2', text: 'An obstacle/tower' });
    });
});
