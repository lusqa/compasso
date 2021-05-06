const LOGGER = require('../../logger')([__filename].join())

module.exports = async (Client, id, name) => {
  try {
    LOGGER.debug('Updating a client on database with name: %s and id: %s', name, id)

    const client = await Client.updateOne({ _id: id }, { name })
    LOGGER.debug('Client updated successfully with name: %s and id: %s', name, id)
    return client
  } catch (err) {
    LOGGER.error('Error updating a client on database with name: %s and id: %s', name, id)
    throw err
  }
}
