import { getAnswerFor } from 'riddle-exam';

export const fetchCorrectAnswer = async (
    riddleId: string,
): Promise<{ id: string; text: string }> => {
    return getAnswerFor(riddleId);
};
