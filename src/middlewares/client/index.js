const create = require('./create-client.middleware')
const deleteClient = require('./delete-client.middleware')

module.exports = {
  create,
  delete: deleteClient
}
