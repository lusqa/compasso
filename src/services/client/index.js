const create = require('./create-client.service')
const get = require('./get-clients.service')
const deleteClient = require('./delete-client.service')
const updateClientName = require('./update-client-name.service')

module.exports = {
  create,
  get,
  deleteClient,
  updateClientName
}
