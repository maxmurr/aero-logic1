export type ExamVerdict = {
    isCorrect: boolean;
    message: string;
};

export const evaluateAnswer = (
    selectedAnswerId: string,
    correctAnswerId: string,
): ExamVerdict => {
    const isCorrect = selectedAnswerId === correctAnswerId;

    return {
        isCorrect,
        message: isCorrect ? 'Great job! Your answer is correct' : 'Your answer is wrong',
    };
};
