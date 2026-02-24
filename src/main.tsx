import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { ContextProvider } from './common/context';
import { provideRiddleAnswer } from './riddle-answer-provider';
import { fetchCorrectAnswer } from './RiddleExamAdapter';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ContextProvider providers={[provideRiddleAnswer(fetchCorrectAnswer)]}>
            <App />
        </ContextProvider>
    </React.StrictMode>,
);
