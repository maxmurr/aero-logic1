import { LandingPage } from './LandingPage';
import { RiddlePage } from './RiddlePage';

export const routes = [
    {
        index: true,
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '*',
        element: <main>404: Page not found</main>,
    },
    {
        path: '/riddle/:riddleId',
        element: <RiddlePage />
    }
];
