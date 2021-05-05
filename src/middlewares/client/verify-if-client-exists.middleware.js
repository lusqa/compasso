const Client = require('../../models/client')

const LOGGER = require('../../logger')([__filename].join())

module.exports = async (req, res, next) => {
  const { id } = req.params

  try {
    LOGGER.debug('Verifing if client was already added...')
    const client = await Client.findOne({ _id: id })

    if (!client) {
      LOGGER.debug('No one client found with id: %s', id)
      return res.status(400).send({ message: `No one client found with id: ${id}` })
    }
  } catch (err) {
    LOGGER.error('Error finding the client on database: %s', err)
    return res.status(500).send({ message: err.message })
  }

  return next()
}
