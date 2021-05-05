
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')

const deleteClient = require('~src/services/client/delete-client.service')

chai.use(chaiAsPromised)
const { expect } = chai

const sandbox = sinon.createSandbox()

describe('get-cities.service', () => {
  describe('When the service ran succesfully', () => {
    it('Should pass the id value to remove method correctly', async () => {
      const remove = sandbox.fake()
      const Client = { remove }

      const id = 'id-to-delete'
      await deleteClient(Client, { id })

      expect(remove.firstArg).to.have.property('_id')
      expect(remove.firstArg).to.be.deep.equal({ _id: id })
    })
  })

  describe('When the service ran with an error', () => {
    it('Should rethrows the error', () => {
      const error = new Error('Error deleting client')
      const Client = {
        remove: () => {
          throw error
        }
      }

      expect(deleteClient(Client, {})).to.be.rejectedWith(error)
    })
  })
})
