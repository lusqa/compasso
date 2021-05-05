const create = require('./create-client.service')
const get = require('./get-clients.service')
const deleteClient = require('./delete-client.service')

module.exports = {
  create,
  get,
  deleteClient
}
