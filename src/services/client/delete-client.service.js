const LOGGER = require('../../logger')([__filename].join())

module.exports = async (Client, { id }) => {
  try {
    LOGGER.debug('Deleting a client on database with id: %s', id)

    const deletedClient = await Client.deleteOne({ _id: id })
    LOGGER.debug('Client deleted successfully with id: %s!', id)
    return deletedClient
  } catch (err) {
    LOGGER.error('Error creating a client on database with name: %s and birthDate: %s. [%o]', id, err)
    throw err
  }
}
