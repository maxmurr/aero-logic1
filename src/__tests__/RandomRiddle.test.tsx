import { App } from '../App';

describe('Random riddle', () => {
    it('access random riddle', () => {
        cy.intercept('GET', 'http://localhost:3000/riddles', {
            body: [{ id: 'RIDDLE_ID', contents: 'Random riddle contents', answers: [] }],
        });
        cy.intercept('GET', 'http://localhost:3000/riddles/RIDDLE_ID', {
            body: {
                id: 'RIDDLE_ID',
                contents: 'Random riddle contents',
                answers: [
                    {
                        id: 'ANSWER_ID',
                        text: 'ANSWER',
                    },
                ],
            },
        });

        cy.mount(<App />, '/');

        cy.getByTestId('work-interval').should('be.visible');
        cy.getByTestId('timestamp').should('be.visible');

        cy.getByTestId('random-riddle-control').click();

        cy.url().should('include', '/riddle/RIDDLE_ID');
        cy.contains('Random riddle contents').should('be.visible');
    });
});
