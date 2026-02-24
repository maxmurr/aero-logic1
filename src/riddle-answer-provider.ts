import { createGenericContext } from './common/context';
import type { Riddle } from './RiddleService';

export type RiddleAnswerProvider = (
    riddleId: string,
) => Promise<Riddle['answers'][number]>;

export const { useContext, createContextProvider: provideRiddleAnswer } =
    createGenericContext<RiddleAnswerProvider>();

export function useRiddleCorrectAnswer() {
    return useContext().value;
}
