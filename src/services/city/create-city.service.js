const LOGGER = require('../../logger')([__filename].join())

module.exports = async (City, { name, state }) => {
  try {
    LOGGER.debug('Creating a city on database with name: %s and state: %s', name, state)
    const city = await City.create({
      name,
      state
    })
    LOGGER.debug('City created successfully with name: %s and state: %s!', name, state)
    return city
  } catch (err) {
    LOGGER.error('Error creating a city on database with name: %s and state: %s. [%o]', name, state, err)
    throw err
  }
}
