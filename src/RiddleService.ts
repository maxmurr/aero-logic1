export type Riddle = {
    id: string;
    contents: string;
    answers: {
        id: string;
        text: string;
    }[];
};

export const getRandomRiddle = (riddles: Riddle[]): Riddle | undefined => {
    return riddles[Math.floor(Math.random() * riddles.length)];
};
