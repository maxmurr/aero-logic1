import { LandingPage } from './LandingPage';

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
];
