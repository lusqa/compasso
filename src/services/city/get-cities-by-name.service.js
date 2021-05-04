const City = require('../../models/City')

const LOGGER = require('../../logger')([__filename].join())

module.exports = async ({ name }) => {
  try {
    LOGGER.debug('Finding cities on database with name: %s', name)
    const city = await City.find({ name })

    if (!city.length) {
      LOGGER.debug('No one city found with name: %s', name)
      return city
    }

    LOGGER.debug('Cities found by name: %s', city.name)
    return city
  } catch (err) {
    LOGGER.error('Error finding cities by name: %s. [%o]', name, err)
    throw err
  }
}
