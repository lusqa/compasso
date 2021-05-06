const chai = require('chai')
const chaiHttp = require('chai-http')

const City = require('~src/models/city')
const Client = require('~src/models/client')

chai.use(chaiHttp)
const { expect } = chai

describe('city.controller', () => {
  describe('When creating a client', () => {
    describe('And was passed a valid body', () => {
      beforeEach(async () => {
        await City.create({ name: 'Fortaleza', state: 'Ceará' })
      })

      it('It should returns 201', async () => {
        const name = 'Lucas Gomes'
        const sex = 'M'
        const birthDate = '1970-12-17'
        const age = 20
        const city = 'Fortaleza'

        const response = await chai
          .request(global.baseURL)
          .post('/client')
          .send({ name, sex, birthDate, age, city })

        expect(response.status).to.be.equal(201, 'The status code should be 201')
      })

      it('It should returns 201 and store correctly on database', async () => {
        const name = 'Lucas Gomes'
        const sex = 'M'
        const birthDate = '1970-12-17'
        const age = 20
        const city = 'Fortaleza'

        let response = await chai
          .request(global.baseURL)
          .post('/client')
          .send({ name, sex, birthDate, age, city })

        expect(response.status).to.be.equal(201, 'The status code should be 201')

        response = await chai
          .request(global.baseURL)
          .get('/client')
          .query({ name })

        expect(response.status).to.be.equal(200, 'The status code should be 200')
        expect(response.body[0].name).to.be.equal(name)
        expect(response.body[0].sex).to.be.equal(sex)
        expect(response.body[0].birthDate).to.includes(birthDate)
        expect(response.body[0].age).to.be.equal(age)
        expect(response.body[0].city.name).to.be.be.equal(city)
      })
    })
  })

  describe('When getting a city', () => {
    let client
    beforeEach(async () => {
      const city = await City.create({ name: 'Fortaleza', state: 'Ceará' })
      client = await Client.create({
        name: 'Lucas Gomes',
        sex: 'M',
        birthDate: '1970-12-17',
        age: 20,
        city: city._id
      })
    })

    describe('And pass the query parameters correctly', () => {
      it('It should return 200', async () => {
        const response = await chai
          .request(global.baseURL)
          .get('/client')
          .query({ name: client.name })

        expect(response.status).to.be.equal(200, 'The status code should be 200')
      })

      it('It should return the correct data', async () => {
        const response = await chai
          .request(global.baseURL)
          .get('/client')
          .query({ name: client.name })

        expect(response.status).to.be.equal(200, 'The status code should be 200')

        expect(response.body[0].name).to.be.equal(client.name)
        expect(response.body[0].sex).to.be.equal(client.sex)
        expect(response.body[0].age).to.be.equal(client.age)
      })
    })
  })
})
