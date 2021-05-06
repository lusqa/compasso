const LOGGER = require('../../logger')([__filename].join())

module.exports = async (Client, { name, id, limit = 10, page = 1 }) => {
  const query = {}

  if (name) {
    query.name = name
  }

  if (id) {
    query._id = id
  }

  try {
    LOGGER.debug('Finding clients on database with query: %o', query)
    const skip = (page - 1) * limit
    const clients = await Client.find(query)
      .populate('city')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ name: 1 })

    if (!clients.length) {
      LOGGER.debug('No one client found with query: %o', query)
      return clients
    }

    LOGGER.debug('Cities found by query: %s', query)
    return clients
  } catch (err) {
    LOGGER.error('Error finding clients by query: %s. [%o]', query, err)
    throw err
  }
}
