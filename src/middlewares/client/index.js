const create = require('./create-client.middleware')
const deleteClient = require('./delete-client.middleware')
const updateClientName = require('./update-client-name.middleware')

module.exports = {
  create,
  delete: deleteClient,
  updateClientName
}
