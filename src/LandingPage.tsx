import { Link } from 'react-router-dom';
import { getTimestamp } from './TimestampService';
import { getWorkInterval } from './WorkIntervalService';
import { useQuery } from '@tanstack/react-query';
import { fetchRiddles } from './RiddleAdapter';
import { getRandomRiddle } from './RiddleService';
import { useMemo } from 'react';

export const LandingPage = () => {
    const currentWorkInterval = getWorkInterval(new Date());
    const currentTimestamp = getTimestamp(new Date());
    const { data = [] } = useQuery({
        queryKey: ['riddle-collection'],
        queryFn: fetchRiddles,
    });
    const memoizeRandomRiddle = useMemo(() => getRandomRiddle(data), [data]);

    return (
        <div>
            <p data-test="work-interval">{currentWorkInterval}</p>
            <p data-test="timestamp">{currentTimestamp}</p>
            <p>Start</p>
            {Boolean(memoizeRandomRiddle?.id) && (
                <Link
                    data-test="random-riddle-control"
                    to={`/riddle/${memoizeRandomRiddle?.id}`}
                >
                    Get random riddle
                </Link>
            )}
        </div>
    );
};
