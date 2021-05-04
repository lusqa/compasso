const City = require('../../models/City')

const LOGGER = require('../../logger')([__filename].join())

module.exports = async ({ name, state }) => {
  const query = {}

  if (name) {
    query.name = name
  }

  if (state) {
    query.state = state
  }

  try {
    LOGGER.debug('Finding cities on database with query: %o', query)
    const cities = await City.find(query)

    if (!cities.length) {
      LOGGER.debug('No one city found with query: %o', query)
      return cities
    }

    LOGGER.debug('Cities found by query: %s', query)
    return cities
  } catch (err) {
    LOGGER.error('Error finding cities by query: %s. [%o]', query, err)
    throw err
  }
}
