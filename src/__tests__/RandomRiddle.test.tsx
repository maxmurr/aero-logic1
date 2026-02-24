import { App } from '../App';

describe('Random riddle', () => {
    it('access random riddle', () => {
        // [{ id: 'RIDDLE_ID', contents: 'Random riddle contents', answers: [] }]

        cy.mount(<App />, '/');

        cy.getByTestId('work-interval').should('be.visible');
        cy.getByTestId('timestamp').should('be.visible');

        cy.getByTestId('random-riddle-control').click();

        cy.url().should('contain', '/riddle/RIDDLE_ID');
        cy.contains('Random riddle contents').should('be.visible');
    });
});
