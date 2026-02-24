const INTERVALS: { label: string; start: number; end: number }[] = [
    { label: 'Busy times', start: 5, end: 11 },
    { label: 'Easy jets', start: 11, end: 17 },
    { label: 'Returning pips', start: 17, end: 23 },
    { label: 'Sleepies', start: 23, end: 5 },
];

export const getWorkInterval = (date: Date): string => {
    const hour = date.getHours();

    for (const interval of INTERVALS) {
        if (interval.start < interval.end) {
            if (hour >= interval.start && hour < interval.end) return interval.label;
        } else {
            if (hour >= interval.start || hour < interval.end) return interval.label;
        }
    }

    return 'Sleepies';
};
