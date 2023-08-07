// https://on.cypress.io/api

describe('Main page tests', () => {
  it('check welcome page data', () => {
    cy.visit('/')
    cy.contains('p', 'Welcome~')
  })

  it('check the first header route', () => {
    cy.visit('/')
    cy.contains('a', 'Back to main')
  })

  it('check the second header route', () => {
    cy.visit('/')
    cy.contains('a', 'API Data')
  })

  it('check footer data', () => {
    cy.visit('/')
    cy.contains('p', 'Kevin J.')
  })
})

describe('API Data page tests', () => {
  it('check first API data', () => {
    cy.visit('/data')
    cy.contains('div', 'Nominatim Reverse')
    cy.contains('p', 'Lon:')
    cy.contains('p', 'Lat:')
    cy.contains('button', 'Submit')
  })

  it('check second API data', () => {
    cy.visit('/data')
    cy.contains('div', 'Nominatim')
    cy.contains('p', 'City:')
    cy.contains('p', 'Street name:')
    cy.contains('p', 'House number:')
    cy.contains('button', 'Submit')
  })

  it('check third API data', () => {
    cy.visit('/data')
    cy.contains('div', 'Own DB data')
    cy.contains('p', 'Database URL:')
    cy.contains('button', 'Submit')
  })
})

describe('walkthrough', () => {
  it('from welcome to API data', () => {
    cy.visit('/')
    cy.get('a[href*="/data"]').click()
    cy.contains('div', 'Nominatim Reverse: Schulstraße, Hönow Süd, Hoppegarten')
    cy.contains('div', 'Nominatim: 52.0881049, 13.1657718')

    cy.get('#inputLat').type('51.178844')
    cy.get('#inputLon').type('-1.826323')
    cy.get('[id$=nominatimReverseButton]').click()
    cy.contains('div', 'Nominatim Reverse: A303, ,')

    cy.get('#inputStreetname').type('Unter den Linden')
    cy.get('#inputHousenumber').type('1')
    cy.get('#inputCity').type('Berlin')
    cy.get('[id$=nominatimButton]').click()
    cy.contains('div', 'Nominatim: 52.0881049, 13.1657718')
  })
})
