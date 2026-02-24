import { Riddle } from './RiddleService';

export const fetchRiddles = async (): Promise<Riddle[]> => {
    const response = await fetch('http://localhost:3000/riddles');
    if (!response.ok) throw new Error(`Failed to fetch riddles: ${response.status}`);
    return response.json();
};

export const fetchRiddle = async (riddleId: string): Promise<Riddle> => {
    const response = await fetch(`http://localhost:3000/riddles/${riddleId}`);
    if (!response.ok) throw new Error(`Failed to fetch riddle: ${response.status}`);
    return response.json();
};
