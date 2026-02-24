/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react(), tailwindcss()],
        server: {
            port: 5173,
        },
        test: {
            include: ['**/*.test.ts'],
            reportsDirectory: 'coverage',
            // globals: true,
            environment: 'node',
            coverage: {
                thresholds: {
                    statements: 80,
                    branches: 80,
                    functions: 80,
                    lines: 80,
                },
            },
        },
        define: {
            // 'process.env.API_URL': JSON.stringify(env.API_URL),
        },
    };
});
