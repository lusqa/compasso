const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')

const updateClientNameService = require('~src/services/client/update-client-name.service')

chai.use(chaiAsPromised)
const { expect } = chai

describe('update-client-name.service', () => {
  describe('When the service ran succesfully', () => {
    it('Should returns succesfully and pass the correct params to the database methods', async () => {
      const updateOne = sinon.fake()
      const Client = { updateOne }

      const clientId = 'fake-id'
      const name = 'Lucas Gomes'

      await updateClientNameService(Client, clientId, name)

      const [[query, body]] = updateOne.args
      expect(query).to.be.deep.equal({ _id: clientId })
      expect(body).to.be.deep.equal({ name })
    })
  })

  describe('When the service ran with an error', () => {
    it('Should rethrows the error', () => {
      const error = new Error('Error finding the client city')
      const Client = {
        updateOne: () => {
          return new Promise((resolve, reject) => (reject(error)))
        }
      }

      expect(updateClientNameService(Client, {})).to.be.rejectedWith(error)
    })
  })
})
