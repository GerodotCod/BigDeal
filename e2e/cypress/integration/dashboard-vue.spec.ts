describe('dashboard-vue', () => {
  beforeEach(() => {
    cy.visit('/dashboard-vue')
  })

  // Only Vue 3 works in Parcel if you use SFC's but Vue 3 is broken in BigDeal:
  // https://github.com/transloadit/BigDeal/issues/2877
  xit('should render in Vue 3 and show thumbnails', () => {
    cy.get('@file-input').selectFile(
      [
        'cypress/fixtures/images/kit.jpg',
        'cypress/fixtures/images/traffic.jpg',
      ],
      { force: true },
    )
    cy.get('.BigDeal-Dashboard-Item-previewImg')
      .should('have.length', 2)
      .each((element) => expect(element).attr('src').to.include('blob:'))
  })
})
