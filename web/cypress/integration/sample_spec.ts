describe('Front page', () => {
  it('should load all documents', () => {
    cy.intercept('GET', '/auth/me', { body: { ok: true } })
    cy.intercept('GET', '/documents', { fixture: 'documents_two.json' })
    cy.intercept('GET', '/documents/xxx1', { fixture: 'documents/xxx1.json' })
    cy.intercept('GET', '/documents/xxx2', { fixture: 'documents/xxx2.json' })

    cy.visit('http://localhost:3000')

    cy.contains('Documents')
    cy.contains('First Document')
    cy.contains('Second Document')

    cy.get('input').should('have.value', 'First Document')
  })

  it('should create new document', () => {
    cy.intercept('GET', '/auth/me', { body: { ok: true } })
    cy.intercept('GET', '/documents', { fixture: 'documents_two.json' }).as('getDocuments')
    cy.intercept('GET', '/documents/xxx1', { fixture: 'documents/xxx1.json' })
    cy.intercept('GET', '/documents/xxx2', { fixture: 'documents/xxx2.json' })
    cy.intercept('GET', '/documents/xxx3', { fixture: 'documents/xxx3.json' }).as('getDocument3')

    cy.intercept('POST', '/documents', { fixture: 'documents/xxx3.json' }).as('createDocument')

    cy.visit('http://localhost:3000')

    cy.wait('@getDocuments')
    cy.intercept('GET', '/documents', { fixture: 'documents_three.json' }).as('getDocuments')

    cy
      .get('button')
      .contains('New')
      .click()

    cy.wait('@getDocument3')

    cy.get('input').should('have.value', 'Third Document')
  })

  it('should delete document', () => {
    cy.intercept('GET', '/auth/me', { body: { ok: true } })
    cy.intercept('GET', '/documents', { fixture: 'documents_three.json' }).as('getDocuments')
    cy.intercept('GET', '/documents/xxx1', { fixture: 'documents/xxx1.json' })
    cy.intercept('GET', '/documents/xxx2', { fixture: 'documents/xxx2.json' })
    cy.intercept('GET', '/documents/xxx3', { fixture: 'documents/xxx3.json' }).as('getDocument3')

    cy.intercept('DELETE', '/documents/xxx3', { body: {} }).as('deleteDocument')

    cy.visit('http://localhost:3000')

    cy.wait('@getDocuments')
    cy.intercept('GET', '/documents', { fixture: 'documents_two.json' }).as('getDocuments')

    cy
      .get('a')
      .contains('Third Document')
      .click()

    cy.wait('@getDocument3')

    cy
      .get('button')
      .contains('Delete')
      .click()

    cy.wait('@deleteDocument')

    cy.get('input').should('have.value', 'First Document')
  })
})
