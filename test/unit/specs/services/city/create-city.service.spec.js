/* eslint-env node, mocha */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const createCityService = require('~src/services/city/create-city.service')

const { expect } = chai

describe('create-city.service', () => {
  it('Should returns succesfully, if create method returns succesfully', async () => {
    const City = {
      create: ({ name, state }) => {
        return new Promise((resolve, reject) => (resolve({ name, state })))
      }
    }

    const name = 'Fortaleza'
    const state = 'Ceará'

    const result = await createCityService(City, { name, state })

    expect(result.name).to.be.equal(name)
    expect(result.state).to.be.equal(state)
  })

  it('Should throws an error, if create method returns an error', () => {
    const error = new Error('Error creating city')
    const City = {
      create: () => {
        throw error
      }
    }

    expect(createCityService(City, {})).to.be.rejectedWith(error)
  })
})
