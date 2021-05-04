const LOGGER = require('../../../logger')([__filename].join())

module.exports = (req, res, next) => {
  const { name, state } = req.query

  if (!name && !state) {
    LOGGER.debug('Mandatory fields are missing!')
    res.status(400).send('You cannot get a city without pass a name or a state in the query!')
  }

  next()
}
