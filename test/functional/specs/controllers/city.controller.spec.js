const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const { expect } = chai

describe('city.controller', () => {
  describe('When creating a city', () => {
    it('And call the body sent is correctly, it should return 201', async () => {
      const name = 'Fortaleza'
      const state = 'Ceará'

      const response = await chai
        .request(global.baseURL)
        .post('/city')
        .send({ name, state })

      expect(response.status).to.be.equal(201, 'The status code should be 201')
    })

    it('And call the body sent is correctly, it should return 201 and store correctly on database', async () => {
      const name = 'Fortaleza'
      const state = 'Ceará'

      let response = await chai
        .request(global.baseURL)
        .post('/city')
        .send({ name, state })

      expect(response.status).to.be.equal(201, 'The status code should be 201')

      response = await chai
        .request(global.baseURL)
        .get('/city')

      expect(response.status).to.be.equal(200, 'The status code should be 200')

      expect(response.body[0].name).to.be.equal(name)
      expect(response.body[0].state).to.be.equal(state)
    })
  })

  describe('When getting a city', () => {
    beforeEach(async () => {
      const name = 'Fortaleza'
      const state = 'Ceará'

      const response = await chai
        .request(global.baseURL)
        .post('/city')
        .send({ name, state })

      expect(response.status).to.be.equal(201, 'The status code should be 201')
    })

    describe('And pass the query parameters correctly', () => {
      it('It should return 200', async () => {
        const name = 'Fortaleza'
        const state = 'Ceará'

        const response = await chai
          .request(global.baseURL)
          .get('/city')
          .query({ name, state })

        expect(response.status).to.be.equal(200, 'The status code should be 200')
      })

      it('It should return the correct data', async () => {
        const name = 'Fortaleza'
        const state = 'Ceará'

        const response = await chai
          .request(global.baseURL)
          .get('/city')
          .query({ name, state })

        expect(response.status).to.be.equal(200, 'The status code should be 200')

        expect(response.body[0].name).to.be.equal(name)
        expect(response.body[0].state).to.be.equal(state)
      })
    })
  })
})
