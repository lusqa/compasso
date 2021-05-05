/* eslint-env node, mocha */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const getCitiesService = require('~src/services/city/get-cities.service')

const { expect } = chai

describe('get-cities.service', () => {
  it('Should returns succesfully, if find method returns succesfully', async () => {
    const cities = [
      {
        name: 'Fortaleza',
        state: 'Ceará'
      },
      {
        name: 'Maracanaú',
        state: 'Ceará'
      }
    ]

    const City = {
      find: () => ({
        skip: () => ({
          limit: () => ({
            sort: () => {
              return new Promise((resolve, reject) => (resolve(cities)))
            }
          })
        })
      })
    }

    const name = 'Fortaleza'
    const state = 'Ceará'

    const result = await getCitiesService(City, { name, state })

    for (const index in cities) {
      expect(result[index].name).to.be.equal(cities[index].name)
      expect(result[index].state).to.be.equal(cities[index].state)
    }
  })

  it('Should throws an error, if find method returns an error', () => {
    const error = new Error('Error creating city')
    const City = {
      find: () => ({
        skip: () => ({
          limit: () => ({
            sort: () => {
              throw error
            }
          })
        })
      })
    }

    expect(getCitiesService(City, {})).to.be.rejectedWith(error)
  })
})
