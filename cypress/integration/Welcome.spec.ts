describe('Find Title', function() {
  it('Has a Title', function() {
    cy.visit('localhost:4200/');
    cy.get('h1').should('contain', 'Welcome');
  });
});

