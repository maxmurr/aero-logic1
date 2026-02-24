import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import { fetchRiddle } from './RiddleAdapter';
import { useRiddleCorrectAnswer } from './riddle-answer-provider';
import { evaluateAnswer, type ExamVerdict } from './RiddleExamService';

export const RiddlePage = () => {
    const { riddleId } = useParams();
    const fetchCorrectAnswer = useRiddleCorrectAnswer();
    const { data, isLoading } = useQuery({
        queryKey: ['riddle', riddleId],
        queryFn: () => fetchRiddle(riddleId!),
    });
    const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
    const [verdict, setVerdict] = useState<ExamVerdict | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const handleAnswerClick = async (answerId: string) => {
        setSelectedAnswerId(answerId);
        setVerdict(null);
        setIsChecking(true);

        const correctAnswer = await fetchCorrectAnswer(riddleId!);
        const result = evaluateAnswer(answerId, correctAnswer.id);
        setVerdict(result);
        setIsChecking(false);
    };

    if (isLoading)
        return (
            <main className="flex items-center justify-center min-h-screen">
                <div className="text-muted-foreground animate-pulse">
                    Loading riddle...
                </div>
            </main>
        );

    if (!data)
        return (
            <main className="flex items-center justify-center min-h-screen">
                <div className="text-destructive">Riddle not found.</div>
            </main>
        );

    return (
        <main className="flex flex-col items-center justify-start min-h-screen gap-8 p-6">
            <h1 className="text-2xl font-semibold text-center max-w-xl">
                {data.contents}
            </h1>
            <ul className="flex flex-col gap-3 w-full max-w-md">
                {data.answers.map((answer) => {
                    const isSelected = selectedAnswerId === answer.id;
                    const status = isSelected
                        ? verdict
                            ? verdict.isCorrect
                                ? 'correct'
                                : 'wrong'
                            : isChecking
                              ? 'pending'
                              : undefined
                        : undefined;

                    return (
                        <li key={answer.id}>
                            <button
                                data-test={`answer-${answer.id}`}
                                data-status={status}
                                className={classnames(
                                    'w-full rounded-lg border px-4 py-3 text-left transition-colors',
                                    {
                                        'bg-green-200 border-green-400':
                                            status === 'correct',
                                        'bg-red-200 border-red-400': status === 'wrong',
                                        'bg-muted border-primary animate-pulse':
                                            status === 'pending',
                                        'opacity-50 cursor-not-allowed':
                                            isChecking && !isSelected,
                                        'hover:bg-accent': !status,
                                    },
                                )}
                                disabled={isChecking}
                                onClick={() => handleAnswerClick(answer.id)}
                            >
                                {answer.text}
                            </button>
                        </li>
                    );
                })}
            </ul>
            {verdict && (
                <p
                    data-test="exam-message"
                    className={classnames('text-lg font-medium', {
                        'text-green-700': verdict.isCorrect,
                        'text-red-700': !verdict.isCorrect,
                    })}
                >
                    {verdict.message}
                </p>
            )}
        </main>
    );
};
