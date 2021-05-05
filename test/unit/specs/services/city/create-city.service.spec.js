/* eslint-env node, mocha */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const createCityService = require('~src/services/city/create-city.service')

const { expect } = chai

describe('create-city.service', () => {
  it('When create method returns successfully, the create-city function should returns sucessfully too', async () => {
    const id = 'id'
    const date = new Date().toISOString()
    const City = {
      create: ({ name, state }) => {
        return {
          _id: id,
          name,
          state,
          createdAt: date,
          updatedAt: date
        }
      }
    }

    const name = 'Fortaleza'
    const state = 'Ceará'

    const result = await createCityService(City, { name, state })

    expect(result._id).to.be.equal(id)
    expect(result.name).to.be.equal(name)
    expect(result.state).to.be.equal(state)
    expect(result.createdAt).to.be.equal(date)
    expect(result.updatedAt).to.be.equal(date)
  })

  it('When create method returns an error, the create-city function should returns throw an error too', () => {
    const error = new Error('Error creating city')
    const City = {
      create: () => {
        throw error
      }
    }

    expect(createCityService(City, {})).to.be.rejectedWith(error)
  })
})
