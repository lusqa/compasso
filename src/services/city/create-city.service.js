const City = require('../../models/City')

const LOGGER = require('../../logger')([__filename].join())

module.exports = async ({ name, state }) => {
  try {
    LOGGER.debug('Creating a city on database...')
    const city = await City.create({
      name,
      state
    })
    LOGGER.debug('City created successfully! name: %s and state: %s', city.name, city.state)
    return city
  } catch (err) {
    LOGGER.error('Error creating a city on database: %s', err)
    throw err
  }
}
