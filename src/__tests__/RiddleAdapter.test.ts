import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { beforeAll, afterAll, afterEach, describe, it, expect } from 'vitest';
import { fetchRiddle, fetchRiddles } from '../RiddleAdapter';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('fetchRiddles', () => {
    it('returns riddles from the API', async () => {
        const riddles = [
            { id: 'RIDDLE_1', contents: 'What has hands but cannot clap?', answers: [] },
        ];

        server.use(
            http.get('http://localhost:3000/riddles', () => {
                return HttpResponse.json(riddles);
            }),
        );

        const result = await fetchRiddles();

        expect(result).toEqual(riddles);
    });

    it('throws on a server error', async () => {
        server.use(
            http.get('http://localhost:3000/riddles', () => {
                return new HttpResponse(null, { status: 500 });
            }),
        );

        await expect(fetchRiddles()).rejects.toThrow('Failed to fetch riddles: 500');
    });
});

describe('fetchRiddle', () => {
    it('returns a single riddle from the API', async () => {
        const riddle = {
            id: 'RIDDLE_1',
            contents: 'What has hands but cannot clap?',
            answers: [],
        };

        server.use(
            http.get('http://localhost:3000/riddles/:riddleId', () => {
                return HttpResponse.json(riddle);
            }),
        );

        const result = await fetchRiddle('RIDDLE_1');

        expect(result).toEqual(riddle);
    });

    it('throws on a server error', async () => {
        server.use(
            http.get('http://localhost:3000/riddles/:riddleId', () => {
                return new HttpResponse(null, { status: 500 });
            }),
        );

        await expect(fetchRiddle('RIDDLE_1')).rejects.toThrow(
            'Failed to fetch riddle: 500',
        );
    });
});
