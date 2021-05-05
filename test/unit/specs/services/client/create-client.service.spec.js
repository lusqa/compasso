/* eslint-env node, mocha */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const createClientService = require('~src/services/client/create-client.service')

const { expect } = chai

describe('create-client.service', () => {
  describe('When the service ran succesfully', () => {
    it('And the client city was found, should returns succesfully', async () => {
      const cityId = 'city-id'
      const City = {
        findOne: ({ name }) => {
          return new Promise((resolve, reject) => (resolve({ _id: cityId, name })))
        }
      }

      const Client = {
        create: ({ name, sex, birthDate, age, city }) => {
          return new Promise((resolve, reject) => (resolve({ name, sex, birthDate, age, city })))
        }
      }

      const name = 'Lucas Gomes'
      const sex = 'M'
      const birthDate = '1970-12-17'
      const age = 20
      const city = 'Fortaleza'

      const result = await createClientService(Client, City, { name, sex, birthDate, age, city })
      expect(result.name).to.be.equal(name)
      expect(result.sex).to.be.equal(sex)
      expect(result.birthDate).to.be.equal(birthDate)
      expect(result.age).to.be.equal(age)
      expect(result.city).to.be.equal(cityId)
    })

    it('And the client city was not found, should throws an error', () => {
      const City = {
        findOne: ({ name }) => {
          return new Promise((resolve, reject) => (resolve()))
        }
      }

      const Client = {
        create: ({ city }) => {
          return new Promise((resolve, reject) => (resolve({ city })))
        }
      }

      const city = 'Fortaleza'
      expect(createClientService(Client, City, { city })).to.be.rejected
    })
  })

  describe('When the service ran with an error', () => {
    it('And the error was thrown by Client.create method, should rethrows the error', () => {
      const error = new Error('Error creating client')
      const Client = {
        create: () => {
          return new Promise((resolve, reject) => (reject(error)))
        }
      }

      const City = {
        findOne: ({ name }) => {
          const _id = 'city-id'
          return new Promise((resolve, reject) => (resolve({ _id, name })))
        }
      }

      expect(createClientService(Client, City, {})).to.be.rejectedWith(error)
    })

    it('And the error was thrown by City.findOne method, should rethrows the erro', () => {
      const error = new Error('Error finding the client city')
      const Client = {
        create: () => {
          return new Promise((resolve, reject) => (resolve()))
        }
      }

      const City = {
        findOne: () => {
          return new Promise((resolve, reject) => (reject(error)))
        }
      }

      expect(createClientService(Client, City, {})).to.be.rejectedWith(error)
    })
  })
})
