const City = require('../../../models/City')

const LOGGER = require('../../../logger')([__filename].join())

module.exports = async (req, res, next) => {
  const { name, state } = req.body

  /* TO-DO - Adds an error handler and start to use next(err) */
  try {
    LOGGER.debug('Verifing if city was already added...')
    const city = await City.findOne({
      name,
      state
    })

    if (city) {
      LOGGER.debug('City already added with name: %s and state: %s', city.name, city.state)
      res.status(400).send('You cannot add a city with same name and state!')
    }
  } catch (err) {
    LOGGER.error('Error finding the city on database: %s', err)
    res.status(500).send(err)
  }

  next()
}
