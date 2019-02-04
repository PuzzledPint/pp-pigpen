const dt = new Date();

describe('Footer Contains Copyright', function() {
  it('Has a copyright for the current year', function() {
    cy.visit('localhost:4200/');
    cy.get('[data-cy=app-footer]').should('contain', '© ' + dt.getFullYear() + ' CC BY-NC-SA Int');
  });
});

