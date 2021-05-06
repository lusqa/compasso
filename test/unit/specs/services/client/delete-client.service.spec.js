
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')

const deleteClient = require('~src/services/client/delete-client.service')

chai.use(chaiAsPromised)
const { expect } = chai

describe('get-cities.service', () => {
  describe('When the service ran succesfully', () => {
    it('Should pass the id value to deleteOne method correctly', async () => {
      const deleteOne = sinon.fake()
      const Client = { deleteOne }

      const id = 'id-to-delete'
      await deleteClient(Client, { id })

      expect(deleteOne.firstArg).to.have.property('_id')
      expect(deleteOne.firstArg).to.be.deep.equal({ _id: id })
    })
  })

  describe('When the service ran with an error', () => {
    it('Should rethrows the error', () => {
      const error = new Error('Error deleting client')
      const Client = {
        deleteOne: () => {
          throw error
        }
      }

      expect(deleteClient(Client, {})).to.be.rejectedWith(error)
    })
  })
})
