import { App } from '../App';
import { ContextProvider } from '../common/context';
import { provideRiddleAnswer } from '../riddle-answer-provider';

const RIDDLE = {
    id: '1',
    contents: 'What is it?',
    answers: [
        { id: '1', text: 'A holding pattern' },
        { id: '2', text: 'An obstacle/tower' },
        { id: '3', text: 'A runway intersection' },
    ],
};

const fakeCorrectAnswer = () => Promise.resolve({ id: '2', text: 'An obstacle/tower' });

describe('Solve riddle', () => {
    it('displays success when user selects the correct answer', () => {
        cy.intercept('GET', 'http://localhost:3000/riddles/1', {
            body: RIDDLE,
        });

        cy.mount(
            <ContextProvider providers={[provideRiddleAnswer(fakeCorrectAnswer)]}>
                <App />
            </ContextProvider>,
            '/riddle/1',
        );

        cy.getByTestId('answer-2').click();

        cy.getByTestId('answer-2').should('have.attr', 'data-status', 'correct');
        cy.contains('Great job! Your answer is correct').should('be.visible');
    });

    it('displays failure when user selects a wrong answer', () => {
        cy.intercept('GET', 'http://localhost:3000/riddles/1', {
            body: RIDDLE,
        });

        cy.mount(
            <ContextProvider providers={[provideRiddleAnswer(fakeCorrectAnswer)]}>
                <App />
            </ContextProvider>,
            '/riddle/1',
        );

        cy.getByTestId('answer-1').click();

        cy.getByTestId('answer-1').should('have.attr', 'data-status', 'wrong');
        cy.contains('Your answer is wrong').should('be.visible');
    });
});
