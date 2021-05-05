const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const getClientsService = require('~src/services/client/get-clients.service')

const { expect } = chai

describe('get-cities.service', () => {
  describe('When the service ran succesfully', () => {
    it('And I pass the name as the parameter, should returns succesfully', async () => {
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
