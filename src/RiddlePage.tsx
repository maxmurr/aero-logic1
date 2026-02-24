import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchRiddle } from './RiddleAdapter';

export const RiddlePage = () => {
    const { riddleId } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ['riddle', riddleId],
        queryFn: () => fetchRiddle(riddleId!),
    });

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
        <main className="flex flex-col items-center justify-center min-h-screen gap-8 p-6">
            <h1 className="text-2xl font-semibold text-center max-w-xl">
                {data.contents}
            </h1>
            <ul className="flex flex-col gap-3 w-full max-w-md">
                {data.answers.map((answer) => (
                    <li key={answer.id}>
                        <button className="w-full rounded-lg border px-4 py-3 text-left hover:bg-accent transition-colors">
                            {answer.text}
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
};
