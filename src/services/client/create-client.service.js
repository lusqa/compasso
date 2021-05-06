const LOGGER = require('../../logger')([__filename].join())

module.exports = async (Client, City, { name, sex, birthDate, age, city }) => {
  try {
    LOGGER.debug('Creating a client on database with name: %s and birthDate: %s', name, birthDate)

    const existingCity = await City.findOne({ name: city })
    if (!existingCity) {
      LOGGER.error('No one city found with name: %s', city)
      throw new Error(`No one city found with name: ${city}`)
    }

    const client = await Client.create({
      name,
      sex,
      birthDate,
      age,
      city: existingCity._id
    })
    LOGGER.debug('Client created successfully with name: %s and birthDate: %s!', name, birthDate)
    return client
  } catch (err) {
    LOGGER.error('Error creating a client on database with name: %s and birthDate: %s. [%o]', name, birthDate, err)
    throw err
  }
}
