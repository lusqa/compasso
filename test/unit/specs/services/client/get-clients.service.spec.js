const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')

const getClientsService = require('~src/services/client/get-clients.service')

const { expect } = chai
chai.use(chaiAsPromised)

describe('get-cities.service', () => {
  describe('When the service ran succesfully', () => {
    describe('And I pass a parameter', () => {
      it('Should returns succesfully and return database object', async () => {
        const clients = [
          {
            name: 'Lucas Gomes',
            sex: 'M',
            birthDate: '1970-12-17',
            age: 20,
            city: 'Fortaleza'
          },
          {
            name: 'Maria José',
            sex: 'F',
            birthDate: '1970-05-12',
            age: 20,
            city: 'Fortaleza'
          }
        ]

        const Client = {
          find: () => ({
            populate: () => ({
              skip: () => ({
                limit: () => ({
                  sort: () => {
                    return new Promise((resolve, reject) => (resolve([clients[0]])))
                  }
                })
              })
            })
          })
        }

        const name = 'Lucas Gomes'
        const result = await getClientsService(Client, { name })

        expect(result[0].name).to.be.equal(clients[0].name)
        expect(result[0].state).to.be.equal(clients[0].state)
      })

      it('Should returns succesfully and pass the correct params to the database methods', async () => {
        const find = sinon.fake.returns({
          populate: () => ({
            skip: () => ({
              limit: () => ({
                sort: () => {
                  return new Promise((resolve, reject) => (resolve([])))
                }
              })
            })
          })
        })

        const Client = { find }

        const name = 'Lucas Gomes'

        await getClientsService(Client, { name })
        expect(find.firstArg).to.have.property('name')
        expect(find.firstArg).to.be.deep.equal({ name })
      })
    })
  })

  describe('When the service ran with an error', () => {
    it('Should rethrows the error', () => {
      const error = new Error('Error getting client')
      const Client = {
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

      expect(getClientsService(Client, {})).to.be.rejectedWith(error)
    })
  })
})
